import * as dotenv from 'dotenv' ;
import  Razorpay  from 'razorpay'
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
  _id: 0, type: 1, link: 1, ref_id: 1, p_id: 1
}

const options = {
  projection: projection
}

export const load =  async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {
    //check if not logged in
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    const session = await event.locals.getSession();
    const params = event.params
    if (!session?.user) {
      throw redirect(302, "/")
    }
    if (!params.slug){
        throw redirect(302, '/mypass');
    }
    
    let existingPayment = await payments.findOne({ ref_id : { $eq: params.slug }, email: { $eq: session.user.email }, status: { $eq: "created" }}, options)


    if(existingPayment){
        let plink = {status:"cancelled"}

        if(existingPayment.p_id != "UPI"){
          plink = await razorInstance.paymentLink.fetch(existingPayment.p_id)

          if(plink.status == "created"){
            plink = await razorInstance.paymentLink.cancel(existingPayment.p_id)
          }

          await payments.findOneAndUpdate({
            p_id: existingPayment.p_id
            },{
                $set:{
                    status: plink.status
                }
          })
          return {cancelled: true}


        }

        await payments.findOneAndUpdate({
          ref_id:params.slug
          },{
              $set:{
                  status: plink.status
              }
        })
        return {cancelled: true}
    }

    throw redirect(302, '/')
  }