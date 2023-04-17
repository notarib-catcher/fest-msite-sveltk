import { redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv' ;
dotenv.config()
import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL

// @ts-ignore
const client = new MongoClient(cstring);
const database = client.db('content');
const events = database.collection('efficientFetching');

  
  const options = {}
export async function load(){
    const foundevents = await events.findOne({title:"events"},options)
    console.log(foundevents)
    if(!foundevents){
        throw redirect(302,'/');
    }
    return {events:foundevents.data};
}