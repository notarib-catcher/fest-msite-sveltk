import { error } from '@sveltejs/kit';
import * as dotenv from 'dotenv' ;
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
dotenv.config()

import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL || ""
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const payments = database.collection('payments')
const secret = process.env.RAZORPAY_WEBHOOK_SECRET || ""

// @ts-ignore



/**
 * 
 * @param {import("../../$types").RequestEvent} request 
 */
export const POST = async ({request}) => {

    const signature = request.headers.get('X-Razorpay-Signature') || "nosig"
    const reqOb = await request.json()
    console.log("validating...")
    console.log(reqOb)

    let validRequest = false
    try{
        validRequest = validateWebhookSignature(JSON.stringify(reqOb), signature, secret)
    }
    catch(ierror){
        console.error(ierror)
        throw error(500,"Signature Verifcation Failure")
    }

    if(!validRequest){
        console.log("Unable to verify webhook")
        throw error(403,"Invalid Signature")
    }
    
    
    await payments.findOneAndUpdate({p_id : { $eq : reqOb.payload.payment_link.entity.id}}, { $set: {status: reqOb.payload.payment_link.entity.status}})
    
    
    return new Response(null)

}