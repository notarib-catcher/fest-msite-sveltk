import * as dotenv from 'dotenv' ;
dotenv.config()

import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL


// @ts-ignore
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const passes = database.collection('passes')
const payments = database.collection('payments')
const projection = {
  _id: 0, type: 1
}

const options = {
  projection: projection
}




export const load =  async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {
  const session = await event.locals.getSession();
    if (!session?.user) {
      return {top_pass: {}, payment: null, origin: process.env.ORIGIN}
    }

    const query = { email: {$eq: session.user.email}, generated: { $eq: true } }
    const querypayments = { email: {$eq: session.user.email}, status: { $eq: "created"} }

    const cursor = await passes.find(query, options)
    const existingPayment = await payments.findOne(querypayments)

    if(existingPayment){
      // @ts-ignore
      existingPayment._id = existingPayment?._id.toString()
    }


    const foundpasses = await cursor.toArray()
    if(foundpasses.length > 0){
      let fpass = foundpasses.filter((pass) => {
        pass.type == "FULL_ACCESS"
      })

      if(fpass.length>0){
        return {top_pass:fpass , payment: existingPayment, origin: process.env.ORIGIN};
      }
    }


    
    return { top_pass: foundpasses[0] || {}, payment: existingPayment, origin: process.env.ORIGIN};
    
  
};