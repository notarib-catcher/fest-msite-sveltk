import { error } from '@sveltejs/kit';
import * as dotenv from 'dotenv' ;
import axios from 'axios'

import jwt from 'jsonwebtoken'
const {sign} = jwt
dotenv.config()

const webprivkey = process.env.WEBPRIVKEY?.replaceAll("$n$","\n")

import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL || ""
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const passes = database.collection('passes')
const tickets = database.collection('tickets')
const revocations = database.collection('revocations')
const payments = database.collection('payments')
const staff_secret = process.env.STAFF_ENDPOINT_SECRET

// @ts-ignore

/**
 * 
 * @param {import("../../../$types").RequestEvent} request 
 */
// @ts-ignore
export const POST = async ({request}) => {

    let {secret, email, approve} = await request.json()
    if(!secret){
        throw error(401,"NO_SECRET")
    }
    if(secret != staff_secret){
        throw error(403, "INVALID_SECRET")
    }

    //secret is valid
    if(!approve){
        return
    }


    console.count()
    let assocPayment = await payments.findOne({ email : { $eq : email}, status: { $eq: "created"}, short_url: { $eq: "/upi" }})
    // @ts-ignore
    if(!assocPayment || assocPayment.status == "paid" || assocPayment.short_url != "/upi"){
        return new Response()
    } 
    console.count()


    await payments.findOneAndUpdate(
    { email : { $eq : email}, status: { $eq: "created"}, short_url: { $eq: "/upi" }},
    {
        $set:{
            status:"paid"
        }
    })
console.count()



    let type = assocPayment.type
    type = (type == "FULL_ACCESS")?"!ALL!":type;
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


    let ticketServerPayload = sign({
        "name": assocPayment.name,
        "phone": assocPayment.contact || "+910000000000",
        "email": email,
        "type" : type
    // @ts-ignore
    },webprivkey,{
        algorithm: 'RS256'
    })
console.count()


    let stringreturned = (await axios.post("https://ticketing.mitblrfest.in/sign",{token: ticketServerPayload})).data
    console.count()
    //stop displaying any older pass
    await passes.findOneAndUpdate({
        email: {$eq: email},
        type: { $ne: "FULL_ACCESS" }
    },{
        $set:{
            generated: false
        }
    })
    
    
    console.log("inserting...")
    await passes.insertOne({

        email: email,
        token: stringreturned,
        generated: true,
        type: (type=="!ALL!")?"FULL_ACCESS":type,
        paymentID: "",
        refCode: (assocPayment.refcode != 'NA')?assocPayment.refcode:""
    }).catch(error => console.error)
    console.count()

    return new Response()

}