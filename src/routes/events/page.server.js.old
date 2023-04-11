import * as dotenv from 'dotenv' ;
dotenv.config()
import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL

// @ts-ignorelg
const client = new MongoClient(cstring);
const database = client.db('content');
const events = database.collection('events');

const projection = {
    _id: 0,
    typesAllowed:1,
    name:1,
    image:1,
    longDescription:1,
    rules:1
  }
  
  const options = {
    projection: projection
  }
export async function load(){
    const foundevents = await events.find({typesAllowed : {$eq:"gold"}},options).toArray();
    
    if(foundevents && foundevents.length == 0){
        return {};
    }
    return {events:foundevents};
}