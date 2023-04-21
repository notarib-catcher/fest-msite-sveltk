import { error, redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv' ;
import axios from 'axios'
import  Razorpay  from 'razorpay'
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';

import jwt from 'jsonwebtoken'
const {sign} = jwt
dotenv.config()

const webprivkey = process.env.WEBPRIVKEY?.replaceAll("$n$","\n")

import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL || ""
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const passes = database.collection('passes')
const payments = database.collection('payments')
const revocations = database.collection('revocations')
const tickets = database.collection('tickets')
const secret = process.env.RAZORPAY_WEBHOOK_SECRET || ""

// @ts-ignore
var razorInstance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID , key_secret: process.env.RAZORPAY_SECRET })



/**
 * 
 * @param {import("../../../$types").RequestEvent} request 
 */
export const POST = async ({request}) => {

    return new Response()

    const signature = request.headers.get('X-Razorpay-Signature') || "nosig"
    const reqOb = await request.json()
    console.log("validating...")
    console.log(reqOb)
    try{
        console.log("STRINGIFY: " + JSON.stringify(reqOb))
        const validRequest = validateWebhookSignature(JSON.stringify(reqOb), signature, secret)
        if(!validRequest){
            throw error(403,"Invalid Signature")
        }
    }
    catch(ierror){
        console.error(ierror)
        throw error(500,"Signature Verifcation Failure")
    }
    
    
    console.log("valid webhook")



    let { notes, id:p_id, customer } = reqOb.payload.payment_link.entity
    let { type, sessionemail:email, refcode, name } = notes


    //debounce code
    let assocPayment = await payments.findOne({ p_id : { $eq : p_id}})
    // @ts-ignore
    if(assocPayment.status == "paid"){
        return new Response()
    }
    
    payments.findOneAndUpdate({ p_id : { $eq: p_id}}, { $set: { status: "paid"}})
    //end of debounce logic
    
    //revocation for upgrades
    if(type.startsWith('UPGRADE:')){

        let toRevoke = await tickets.findOne({ email: {$eq: email}, type: { $ne: "!ALL!"}  })
        if(toRevoke){
            let alreadyRevoked = await revocations.findOne( {_id: {$eq: toRevoke?._id}})
            if(!alreadyRevoked){
                await revocations.insertOne({
                    _id: toRevoke._id,
                    type: "!FULL!",
                    reason: "Upgraded to new ticket"
                })
            }
        }

        type = "!ALL!"
    }

    //Rename full access pass to match type naming used by MPTICKET for an all access pass
    type = (type == "FULL_ACCESS")?"!ALL!":type;


    //sign MPTICKET payload
    let ticketServerPayload = sign({
        "name": name,
        "phone": customer.contact || "+910000000000",
        "email": email,
        "type" : type
    // @ts-ignore
    },webprivkey,{
        algorithm: 'RS256'
    })

    console.log("PAYLOAD: "+ ticketServerPayload)

    //TODO send it to MPTICKET and add it to stringreturned


    let payloadreturned = await axios.post("https://ticketing.mitblrfest.in/sign",{token: ticketServerPayload})

    let stringreturned = payloadreturned.data

    //stop displaying the old pass
    await passes.findOneAndUpdate({
        email: {$eq: email},
        type: { $ne: "FULL_ACCESS" }
    },{
        $set:{
            generated: false
        }
    })



    //insert pass
    await passes.insertOne({
        email: email,
        token: stringreturned,
        generated: true,
        type: (type=="!ALL!")?"FULL_ACCESS":type,
        paymentID: p_id,
        refCode: (refcode != 'NA')?refcode:""
    })


    
    return new Response()

}