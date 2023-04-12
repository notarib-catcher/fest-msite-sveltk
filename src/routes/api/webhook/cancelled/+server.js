import { error } from '@sveltejs/kit';
import * as dotenv from 'dotenv' ;
import  Razorpay  from 'razorpay'
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
dotenv.config()

import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL || ""
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const passes = database.collection('passes')
const payments = database.collection('payments')
const secret = process.env.RAZORPAY_WEBHOOK_SECRET || ""

// @ts-ignore
var razorInstance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID , key_secret: process.env.RAZORPAY_SECRET })



/**
 * 
 * @param {import("../../../$types").RequestEvent} request 
 */
export const POST = async (request) => {

    const signature = request.request.headers.get('X-Razorpay-Signature') || "nosig"
    const reqOb = await request.request.json()
    console.log("validating...")
    const validRequest = validateWebhookSignature(JSON.stringify(await request.request.json()), signature, secret)
    if(!validRequest){
        throw error(403,"Invalid Signature")
    }
    
    console.log("valid webhook")
    console.log(reqOb)

    return new Response({})

}