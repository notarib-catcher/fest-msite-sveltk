import * as dotenv from 'dotenv';
import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';

import { verify } from 'jsonwebtoken';
import axios from 'axios'

import jwt from 'jsonwebtoken'
const {sign} = jwt
// @ts-ignore
import { MongoClient } from 'mongodb';
import { redirect } from '@sveltejs/kit';


dotenv.config();
const webprivkey = process.env.WEBPRIVKEY?.replaceAll("$n$","\n")


//@ts-ignore
const razorInstance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_SECRET });
const connectionString = process.env.MONGO_URL;

// @ts-ignore
const client = new MongoClient(connectionString);
const database = client.db(process.env.MONGO_DB_NAME);
const payments = database.collection('payments');
const passes = database.collection('passes');
const revocations = database.collection('revocations')
const tickets = database.collection('tickets')

export const load = async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {

    const {params} = event
    const session = await event.locals.getSession();

    //logged in check
    if (!session?.user) {
        throw redirect(302, "/book");
    }


    //check if params are valid
    if (!params.slug){
        throw redirect(302, '/mypass');
    }

    //find associated payment in db
    let paymentdoc = await payments.findOne({ref_id: params.slug, email: session.user.email, status: "created"})

    //no payment?
    if(!paymentdoc){
        throw redirect(302,"/book");
    }


    //redirect if this payment was made using ALRERNATE_PAYMENT_METHOD (manual UPI verification)
    if(paymentdoc.short_url == "/upi"){
        throw redirect(301,"/upi");
    }

    //poll razorpay for the link
    let linkobj = await razorInstance.paymentLink.fetch(paymentdoc.p_id)

    if(!linkobj){
        throw redirect(302,'/book');
    }

    //check if it is still unpaid and open

    if(linkobj.status == "created"){
        throw redirect(302,'/book')
    }

    //status has changed, update it. Also acts as a debounce

    //Since we dont set any intermediate state, this exposes a race condition where 2 passes may be generated. 
    //However, it is relatively hard to exploit (window of less than 100ms over a network) and minor.
    //a fix would be to set the pass state to "checking" while the checks are occuring. 
    //However, this would require refactoring the payment handler and we do not have time for that right now

    payments.findOneAndUpdate({ref_id:linkobj.reference_id},{$set:{status: linkobj.status}})

    //any other state (expired/cancelled)

    if(linkobj.status != 'paid'){
        return { res: "Payment unprocessed", redirect: "/book" }
    }

    //payment success, add pass

    let {type, refCode, contact, p_id} = paymentdoc
    // console.log("Processing: " + type + " for " + params.slug)

    // if(type.startsWith('UPGRADE:')){

    //     let toRevoke = await tickets.findOne({ email: {$eq: session.user.email}, type: { $ne: "!ALL!"}  })
    //     if(toRevoke){
    //         let alreadyRevoked = await revocations.findOne( {_id: {$eq: toRevoke?._id}})
    //         if(!alreadyRevoked){
    //             await revocations.insertOne({
    //                 _id: toRevoke._id,
    //                 type: "!FULL!",
    //                 reason: "Upgraded to new ticket"
    //             })
    //         }
    //     }

    //     type = "!ALL!"
    // }
    // console.log("Revoke check done")

    //Rename full access pass to match type naming used by MPTICKET for an all access pass
    type = (type == "FULL_ACCESS")?"!ALL!":type;
    // console.log("signing")

    let EXpass = await passes.findOne({paymentID: p_id, generated:true})
    if(EXpass){
        throw redirect(302, "/mypass")
    }

    let payloadreturned = {data: "https://compete.mitblrfest.in"}
    if(!type.startsWith("SPORT")){
        let ticketServerPayload = sign({
            "name": session.user.name,
            "phone": contact || "+910000000000",
            "email": session.user.email,
            "type" : type
        // @ts-ignore
        },webprivkey,{
            algorithm: 'RS256'
        })
    
    
        // console.log("PAYLOAD: "+ ticketServerPayload)
    
        //TODO send it to MPTICKET and add it to stringreturned
    
    
        payloadreturned = await axios.post("https://ticketing.mitblrfest.in/sign",{token: ticketServerPayload})
    }

    //sign MPTICKET payload
    

    let stringreturned = payloadreturned.data

    //stop displaying the old pass if any
    // await passes.findOneAndUpdate({
    //     email: {$eq: session.user.email},
    //     type: { $ne: "FULL_ACCESS" }
    // },{
    //     $set:{
    //         generated: false
    //     }
    // })



    //insert pass
    await passes.insertOne({
        email: session.user.email,
        token: stringreturned,
        generated: true,
        type: (type=="!ALL!")?"FULL_ACCESS":type,
        paymentID: p_id,
        refCode: (refCode != 'NA')?refCode:""
    })

    await payments.updateOne({
        _id:"DAILY_PAYM_TRACK"
    },
    {
        $inc:{
            count: 1
        }
    }
    )


    
    return {res: "Payment processed! Redirecting...", redirect: "/mypass"}


}
