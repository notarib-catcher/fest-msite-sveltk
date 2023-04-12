import * as dotenv from 'dotenv' ;
dotenv.config()
import  Razorpay  from 'razorpay'
import { v4 as uuidv4 } from 'uuid';

import {verify} from 'jsonwebtoken'

const passarray = [
    {
        type: "FULL_ACCESS",
        INRcost: 700
    },
    {
        type: "FLAGSHIP_1",
        INRcost: 500
    },
    {
        type: "FLAGSHIP_2",
        INRcost: 500
    },
    {
        type: "FLAGSHIP_3",
        INRcost: 500
    },
    {
        type: "FLAGSHIP_4",
        INRcost: 500
    },
    {
        type: "FLAGSHIP_5",
        INRcost: 500
    },
    {
        type: "PROSHOW",
        INRcost: 400
    },
    {
        type: "UPGRADE:PROSHOW_TO_FULL_ACCESS",
        INRcost: 300
    },
    {
        type: "UPGRADE:FLAGSHIP_TO_FULL_ACCESS",
        INRcost: 200
    }
]

//@ts-ignore
var razorInstance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID , key_secret: process.env.RAZORPAY_SECRET })


// @ts-ignore
import { MongoClient, ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';


const cstring = process.env.MONGO_URL

// @ts-ignore
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const payments = database.collection('payments')
const passes = database.collection('passes')
const ambassadors = database.collection('ambassadors')


const projection = {
  _id: 0, type: 1, link: 1
}

const options = {
  projection: projection
}

export const load =  async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {

    if(!(process.env.ALLOW_PAYMENTS == "y")){
        throw redirect(302, "/book")
    }

    //check if not logged in
    const session = await event.locals.getSession();
    if (!session?.user) {
      throw redirect(302, "/book")
    }

    
    //get params from JWT and verify it  too

    // @ts-ignore
    const params = event.params

    
    if(!params.slug){
        throw redirect(302, "/?cancelled")
    }

    let decoded = {}
    
    try{
        //@ts-ignore
        decoded = verify(params.slug, session.user.email)
        
    }
    catch(error){
        throw redirect(301, "/book")
    }

    // @ts-ignore
    if(!decoded.refcode || !decoded.iat || !decoded.type){
        throw redirect(302, "/book")
    }

    // @ts-ignore
    let { refcode, type } = decoded
    // @ts-ignore
    let time = decoded.iat

    let queried_type = type

    
    //timeout payment URLs after 20 seconds

    let ctime = new Date().getTime()

    if(ctime - parseInt(time) > 20000){
        throw redirect(302, "/book")
    }

    //check for existing payment

    const query = { email: {$eq: session.user.email}, status: { $eq: 'created'} }
    const existingPayment = await payments.findOne(query, options)

    if(existingPayment){
        throw redirect(302, "/book")
    }


    //get payment params

    let pass = passarray.find((pass) => {
        // @ts-ignore
        return pass.type == queried_type
    })

    let cpass = await passes.find({email : {$eq: session.user.email}}).toArray()


    if(queried_type == "UPGRADE:PROSHOW_TO_FULL_ACCESS" ){     

        //deny if they already have the all access pass
        let filteredDenied = cpass.filter((pass) => {
            return (pass.type == "FULL_ACCESS")
        })

        if(filteredDenied.length > 0) {
            throw redirect(301,"/mypass?cancelled")
        }

        //deny if they dont have a proshow pass
        let filteredAllowed = cpass.filter((pass) => {
            return (pass.type.includes("PROSHOW"))
        })

        if(filteredAllowed.length == 0) {
            throw redirect(301,"/book?cancelled")
        }
    }

    if(queried_type == "UPGRADE:FLAGSHIP_TO_FULL_ACCESS" ){
        

        //deny if they already have the all access pass
        let filteredDenied = cpass.filter((pass) => {
            return (pass.type == "FULL_ACCESS")
        })

        if(filteredDenied.length > 0) {
            throw redirect(301,"/mypass?cancelled")
        }

        //deny if they dont have a flagship pass
        let filteredAllowed = cpass.filter((pass) => {
            return (pass.type.startsWith("FLAGSHIP"))
        })

        if(filteredAllowed.length == 0) {
            throw redirect(301,"/book?cancelled")
        }
    }

    if(queried_type == "FULL_ACCESS" ){

        //deny if they already have ANY pass
       

        if(cpass.length > 0) {
            throw redirect(301,"/mypass?cancelled")
        }
        
    }

    let existingallaccesspass = cpass.filter((somepass) => {
        return somepass.type == "FULL_ACCESS"
    })

    if(existingallaccesspass.length > 0){
        throw redirect(301,"/mypass?cancelled")
    }

   



    let rcode = "n"

    if(!pass){
        throw redirect(302, "/?cancelled")
    }

    let costMultiplier = 1;

    if(refcode != "NA"){
        let amb = await ambassadors.findOne({refCode : { $eq: refcode }})
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
        notes:{
            type: queried_type,
            sessionemail: session.user.email || "noneprovided",
            refcode: refcode
        },
        callback_url:"https://solstice.mitblrfest.in/mypass",
        callback_method: 'get'
    // @ts-ignore
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
        refCode: refcode
    })



    return{ link: razorpaylink.short_url, rcodestatus: rcode}
};