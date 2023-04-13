import * as dotenv from 'dotenv' ;
dotenv.config()
import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL

// @ts-ignore
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const events = database.collection('events');


  
  
// @ts-ignore
export async function load({params}){
    
    const foundevents = await events.find({route:params.id}).toArray();
    let modifiedevents = [];
    for(let i=0;i<foundevents.length;i++){
        let event = foundevents[i];
        modifiedevents.push({
            _id: event._id.toString(),
            name: event.name,
            pass: event.pass,
            slug: event.slug,
            rules: event.rules,
            longDescription: event.longDescription,
            image: event.image,
            route: event.route,
            
        });
    }
    if(modifiedevents.length == 0){
        return {};
    }
    return {event:modifiedevents[0]};
}