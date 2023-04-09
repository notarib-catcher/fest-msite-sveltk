import * as dotenv from 'dotenv' ;
import  Razorpay  from 'razorpay'
import { v4 as uuidv4 } from 'uuid';

//@ts-ignore
var razorInstance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID , key_secret: process.env.RAZORPAY_SECRET })
dotenv.config()

import { MongoClient, ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';


const cstring = process.env.MONGO_URL

// @ts-ignore
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const payments = database.collection('payments')

const projection = {
  _id: 0, type: 1, link: 1
}

const options = {
  projection: projection
}

export const load =  async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {
    //check if not logged in
    const session = await event.locals.getSession();
    if (!session?.user) {
      throw redirect(302, "/book")
    }

    //check for existing payment

    const query = { email: {$eq: session.user.email}, status: { $eq: 'created'} }
    const existingPayment = await payments.findOne(query, options)

    if(existingPayment){
        throw redirect(302, "/book")
    }

    let refid = uuidv4();
    let razorpaylink = await razorInstance.paymentLink.create({
        reference_id: refid,
        amount: 500,
        currency: "INR",
        accept_partial: false,
        description: "TechSolstice pass",
        customer:{
            name: session.user.name || "Anonymous",
            email: session.user.email || "solstice.common.acc@mitblrfest.in",
            contact: "+91" + "0000000000"
        },
        notify: {
            email:true,
            sms: false
        },
        reminder_enable: false,
        notes:{},
        callback_url:"https://solstice.mitblrfest.in/mypass",
        callback_method: 'get'
    }).catch(Error => {
        throw redirect(302, "/book")
    })

    payments.insertOne({
        //@ts-ignore
        ref_id: razorpaylink.reference_id,
        email: session.user.email,
        short_url: razorpaylink.short_url,
        status: razorpaylink.status,
        p_id: razorpaylink.id
    })



    return{}
};