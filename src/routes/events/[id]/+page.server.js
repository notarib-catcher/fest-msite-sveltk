import { redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv' ;
dotenv.config()
import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL

// @ts-ignore
const client = new MongoClient(cstring);
const database = client.db('content');
const databaseReal = client.db(process.env.MONGO_DB_NAME);
const events = database.collection('events');
const passes = databaseReal.collection('passes')

const projection = {
    _id: 0
  }

  const options = {
    projection: projection

  }
export async function load(event){
    let {params} = event
    let cpass = {type:"nopass"}
    const session = await event.locals.getSession();
    if (session?.user) {
        const query = { email: {$eq: session.user.email}, generated: { $eq: true } }
        const cursor = await passes.find(query,options)
        const foundpasses = await cursor.toArray()
        if(foundpasses.length > 0){
            let fpass = foundpasses.filter((pass) => {
                return (pass.type == "FULL_ACCESS" || pass.type == "STAFF")
            })

            if(fpass.length>0){
                cpass.type = fpass[0].type
            }
            else{
                cpass.type = foundpasses[0].type
            }
            
        }

    }
    else{
        cpass.type = "nosign"
    }

    

    const foundevents = await events.find({route:params.id}).toArray();
    let modifiedevents = [];
    for(let i=0;i<foundevents.length;i++){
        let event = foundevents[i];
        modifiedevents.push({
            _id: event._id.toString(),
            name: event.title,
            pass: event.pass,
            slug: event.shortDescription,
            rules: event.rules.split(/\n|\r\n/g).map((/** @type {any} */ v, /** @type {any} */ i) => {
                return  {text:v, br:"<br>"} }),
            longDescription: event.longDescription.split(/\n|\r\n/g).map((/** @type {any} */ v, /** @type {any} */ i) => {
                return  {text:v, br:"<br>"} }),
            image: event.image,
            route: event.route,
            date: event.Date,
            prizepool:event.prizepool ,
            time: event.time,
            venue: event.venue,
            reglink: event.reglink || null,
            mdLink: event.mdLink || null,
            ownedpasstype: cpass.type,
            regneeded: event.regneeded || null
        });
    }
    if(modifiedevents.length == 0){
        throw redirect(301,"/404")
    }
    return {event:modifiedevents[0]};
}