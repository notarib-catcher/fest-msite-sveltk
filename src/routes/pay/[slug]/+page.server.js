import * as dotenv from 'dotenv' ;
import  Razorpay  from 'razorpay'
import { v4 as uuidv4 } from 'uuid';

const passarray = [
    {
        type: "STANDARD",
        INRcost: 500
    },
    {
        type: "MINI",
        INRcost: 500
    },
    {
        type: "PROSHOW",
        INRcost: 500
    }
]

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
const ambassadors = database.collection('ambassadors')


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
    
    const params = event.params

    
    if(!params.slug){
        throw redirect(302, "/?cancelled")
    }

    let splitSlug = params.slug.split('-')

    if(!splitSlug[2]){
        throw redirect(302, "/book")
    }

    let queried_type = splitSlug[0]
    let refCode = splitSlug[1]
    let time = splitSlug [2]

    //timeout payment URLs after 20 seconds

    let ctime = new Date().getTime()

    if(ctime - parseInt(time) > 20000){
        throw redirect(302, "/book")
    }

    const query = { email: {$eq: session.user.email}, status: { $eq: 'created'} }
    const existingPayment = await payments.findOne(query, options)

    if(existingPayment){
        throw redirect(302, "/book")
    }


    //get payment params

   

    let pass = passarray.find((pass) => {
        return pass.type == queried_type
    })

    let rcode = "n"

    if(!pass){
        throw redirect(302, "/?cancelled")
    }

    let costMultiplier = 1;

    if(refCode != "NA"){
        let amb = await ambassadors.findOne({refCode : { $eq: refCode }})
        if(amb){
            costMultiplier = 0.8
            rcode = "y"
        }
        else{
            return{ link: process.env.ORIGIN + "/book", rcodestatus: "i"}
        }
    }



    let refid = uuidv4();
    let razorpaylink = await razorInstance.paymentLink.create({
        reference_id: refid,
        amount: (pass.INRcost * 100 * costMultiplier),
        currency: "INR",
        accept_partial: false,
        description: "TechSolstice " + pass.type + " pass",
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
        throw redirect(302, "/book?cancelled")
    })

    payments.insertOne({
        //@ts-ignore
        ref_id: razorpaylink.reference_id,
        email: session.user.email,
        short_url: razorpaylink.short_url,
        status: razorpaylink.status,
        p_id: razorpaylink.id,
        type: pass.type,
        refCode: refCode
    })



    return{ link: razorpaylink.short_url, rcodestatus: rcode}
};