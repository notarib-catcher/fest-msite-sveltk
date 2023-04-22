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
const staff_secret = process.env.STAFF_ENDPOINT_SECRET

export const POST = async ({request}) => {

    let {secret, email, name, phone, approve} = await request.json()

    if(email.trim() == "" || name.trim() == "" || phone.trim() == ""){
        throw error(400,"INVALID_REQUEST")
    }
    if(!secret){
        throw error(401,"NO_SECRET")
    }
    if(secret != staff_secret){
        throw error(403, "INVALID_SECRET")
    }

    //secret is valid
    if(!approve){
        return new Response()
    }



    let ticketServerPayload = sign({
        "name": name,
        "phone": phone,
        "email": email,
        "type" : "!STAFF!"
    // @ts-ignore
    },webprivkey,{
        algorithm: 'RS256'
    })
console.count()


    let stringreturned = (await axios.post("https://ticketing.mitblrfest.in/sign",{token: ticketServerPayload})).data
    console.count()
    //stop displaying any older pass

    await passes.updateMany({
        email: {$eq: email},
        type: { $ne: "FULL_ACCESS" }
    },{
        $set:{
            generated: false
        }
    })
    
    

    await passes.insertOne({

        email: email,
        token: stringreturned,
        generated: true,
        type: "STAFF",
        paymentID: "",
        refCode: ""
    }).catch(error => console.error)
    console.count()

    return new Response()

}