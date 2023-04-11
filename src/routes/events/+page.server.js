import * as dotenv from 'dotenv' ;
dotenv.config()
import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL

// @ts-ignore
const client = new MongoClient(cstring);
const database = client.db('content');
const events = database.collection('events');

const projection = {
    _id: 0
  }
  
  const options = {
    projection: projection
  }
export async function load(){
    const foundevents = await events.find({},options).toArray();
    if(foundevents.length == 0){
        return {};
    }
    return {events:foundevents};
}