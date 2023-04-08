import { redirect } from '@sveltejs/kit';

import * as dotenv from 'dotenv' ;
dotenv.config()

import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL

// @ts-ignore
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const passes = database.collection('passes')

const projection = {
  _id: 0, type: 1, token: 1
}

const options = {
  projection: projection
}

export const load =  async (event) => {
  const session = await event.locals.getSession();
    if (!session?.user) {
      throw redirect(303, '/'); //Not logged in => No access
    }

    const query = { email: {$eq: session.user.email}, generated: { $eq: true } }
    const cursor = await passes.find(query, options)

    const foundpasses = await cursor.toArray()

    if(foundpasses.length == 0){
      return {};
    }
  
    return {passes: foundpasses};
};