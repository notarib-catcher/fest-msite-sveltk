import * as dotenv from 'dotenv';
import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';

import { verify } from 'jsonwebtoken';
// @ts-ignore
import { MongoClient } from 'mongodb';
import { redirect } from '@sveltejs/kit';

dotenv.config();

// contains all passes and possible upgrades
const passarray = [
    
    //mens

    {
        type: "SPORT_FB_M",
        name: "Football (M)",
        INRcost: 5000,
        open: false
    },

    {
        type: "SPORT_BB_M",
        name: "Basketball (M)",
        INRcost: 3000,
        open: false
    },

    {
        type: "SPORT_VB_M",
        name: "Volleyball (M)",
        INRcost: 3000,
        open: false
    },

    {
        type: "SPORT_TN_M",
        name: "Tennis (M)",
        INRcost: 800,
        open: false
    },

    {
        type: "SPORT_TT_M",
        name: "Table Tennis (M)",
        INRcost: 800,
        open: false
    },

    //womens

    {
        type: "SPORT_BB_F",
        name: "Basketball (F)",
        INRcost: 2000,
        open: false
    },

    {
        type: "SPORT_TB_F",
        name: "Throwball (F)",
        INRcost: 2000,
        open: false
    },

    {
        type: "SPORT_TN_F",
        name: "Tennis Singles (F)",
        INRcost: 200,
        open: false
    },

    {
        type: "SPORT_TT_F",
        name: "Table Tennis Singles (F)",
        INRcost: 200,
        open: false
    },


    //gender neutral

    
    {
        type: "SPORT_ATH",
        name: "Athletics",
        INRcost: 200,
        open: false
    },

    {
        type: "SPORT_CHS",
        name: "Chess (Team of 6)",
        INRcost: 1500,
        open: false
    },

    // cultural

    {
        type: "CLTR_PRO",
        name: "Proshow and Cultural Events",
        INRcost: 799,
        open: true
    },
    {
        type: "SUP_PRO",
        name: "SUPER",
        INRcost: 799,
        open: false
    },
    {
        type: "CLTR_BOB",
        name: "Battle of Bands",
        INRcost: 2500,
        open: false
    },
    {
        type: "CLTR_GRD",
        name: "Group Dance",
        INRcost: 3000,
        open: true
    },
    {
        type: "CLTR_FAS",
        name: "Fashion Show",
        INRcost: 250,
        open: false
    },  
    
    //esports
    
    {
        type: "ESPORTS",
        name: "Esports",
        INRcost: 150,
        open: true
    }

];

//@ts-ignore
const razorInstance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_SECRET });
const connectionString = process.env.MONGO_URL;

// @ts-ignore
const client = new MongoClient(connectionString);
const database = client.db(process.env.MONGO_DB_NAME);
const payments = database.collection('payments');
const passes = database.collection('passes');
const ambassadors = database.collection('ambassadors');


const projection = {
    _id: 0, type: 1, link: 1
};

const options = {
    projection: projection
};

export const load = async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {
     // referralStatus is used to apply discounts
    let costMultiplier = 1;
    let referralStatus = "n";

    // use of console.count ?
    // checking for different errors
    console.count("pprc")
    // believe it is used to stop taking payments
    if (process.env.ALLOW_PAYMENTS != "y") {
        throw redirect(302, "/book");
    }
    console.count("pprc");

    //check if not logged in
    const session = await event.locals.getSession();
    if (!session?.user) {
        throw redirect(302, "/book");
    }

    console.count("pprc");

    // @ts-ignore
    // if the book endpoint doesn't send correct payload redirect to error page
    const params = event.params;
    /* what is /?cancelled */
    if (!params.slug) {
        throw redirect(302, "/?cancelled")
    }

    let decoded = {};

    // since the payload that book endpoint generate is encrypted by using the users email id as the key
    // the same step is performed to get the actual value of the payload
    try {
        //@ts-ignore
        decoded = verify(params.slug, session.user.email);
    } catch (error) {
        throw redirect(301, "/book");
    }

    // @ts-ignore
    if (!decoded.refcode || !decoded.iat || !decoded.type) {
        throw redirect(302, "/book");
    }
    console.count("pprc");

    // @ts-ignore
    const { refcode: referralCode, type } = decoded;
    // @ts-ignore
    const time = decoded.iat;

    const queried_type = type;

    console.count("pprc");

    //timeout payment URLs after 20 seconds

    if (new Date().getTime() - parseInt(time) > 20_000) {
        throw redirect(302, "/book");
    }

    //check for existing payment
    const query = { email: { $eq: session.user.email }, status: { $eq: 'created' } };
    const existingPayment = await payments.findOne(query, options);

    if (existingPayment) {
        throw redirect(302, "/book");
    }

    console.count("pprc");

    //get payment params

    const pass = passarray.find((pass) => {
        // @ts-ignore
        return pass.type == queried_type;
    })
    
    // to allow for disabling of certain passes without effecting other type
    if (!pass?.open) {
        throw redirect(302, "/book?cancelled&passnotopen");
    }

    let currentPasses = await passes.find({ email: { $eq: session.user.email }, generated: { $eq: true } }).toArray();
    let cpasstypearr = []
    for(let _cpass of currentPasses){
        cpasstypearr.push(_cpass.type)
    }

    // if the queried_type doesn't exist in passarray
    if (!pass) {
        throw redirect(302, "/?cancelled");
    }

    if (referralCode != "NA") {
        // check if the referal code is correct
        let ambassador = await ambassadors.findOne({ refCode: { $eq: referralCode } })

        if (ambassador) {
            costMultiplier = 0.8;
            referralStatus = "y";
        } else {
            // if not return the book endpoint to page.svelte which just redirects to whatever link that it receives
            return { link: process.env.ORIGIN + "/book", rcodestatus: "i" };
        }
    }

    // get all possible passes
    let allowedPasses = getValidPasses(cpasstypearr);

    if (allowedPasses.includes(queried_type)) {

        if(queried_type == "CLTR_PRO" || queried_type == "SUP_PRO"){
            let countDoc = await payments.findOne({_id: "DAILY_PAYM_TRACK"})
            if(countDoc){
                let currDate = new Date()
                let cdocDate = new Date(countDoc.date)
    
                if(currDate.getDay() != cdocDate.getDay()){
                    await payments.updateOne({_id: "DAILY_PAYM_TRACK"}, {
                        $set:{
                            date: currDate.toISOString(),
                            count: 0
                        }
                    })
                }
                else if(countDoc.count >= countDoc.maxcount){
                    throw redirect(302,"/book?nostock")
                }
            }   
        }

        return await paymentHandler(session, decoded, pass, queried_type, costMultiplier, referralCode, referralStatus);
    } else {
        throw redirect(302, "/mypass");
    }
};

/** OLD CODE IGNORE THIS
 * Handle pass upgrades as follows.
 *     CURRENT PASS -> UPGRADE OPTIONS
 *     FULL_ACCESS -> Nothing
 *     PROSHOW -> UPGRADE:PROSHOW_TO_FULL_ACCESS
 *     ESPORTS -> UPGRADE:ESPORTS_TO_FULL_ACESSS
 *     FLAGSHIP -> UPGRADE:FLAGSHIP_TO_FUL
 *     NO PASS -> ANY OF [PROSHOW, ESPORTS, FLAGSHIP, FULL_ACCESS]
 *
 * Return all the passes that can be upgraded to.
 */
const getValidPasses = (currentPasses) => {
    const passes = ["SPORT_FB_M", "SPORT_BB_M", "SPORT_VB_M", "SPORT_TN_M", "SPORT_TT_M", "SPORT_BB_F", "SPORT_TB_F", "SPORT_TN_F", "SPORT_TT_F", "SPORT_ATH", "SPORT_CHS",
                    "CLTR_PRO", "SUP_PRO", "CLTR_BOB", "CLTR_GRD", "CLTR_FAS", "ESPORTS"];
    if (currentPasses.length == 0) {
        console.log("No existing pass")
        return passes
    }

    //prevent buying same pass twice
    else{
        return passes.filter((pass) => {
            return !currentPasses.includes(pass) 
        })
    }

    // let validPasses = [];

    // switch (currentPass.type) {
    //     case 'STAFF':
    //         throw redirect(301, "/mypass");

    //     case 'FULL_ACCESS':
    //         throw redirect(301, "/mypass");

    //     case 'PROSHOW':
    //         return ["UPGRADE:PROSHOW_TO_FULL_ACCESS"];

    //     case 'ESPORTS':
    //         return ["UPGRADE:ESPORTS_TO_FULL_ACCESS"];

    //     case 'FLAGSHIP':
    //         return ["UPGRADE:FLAGSHIP_TO_FULL_ACCESS"];
    // }

    // return validPasses;
}

// @ts-ignore
const paymentHandler = async (session, decoded, pass, queried_type, costMultiplier, referralCode, referralStatus) => {
    let referenceID = uuidv4();

    // rayzorpay is not used only the alternate payment method is used
    if (process.env.USE_ALTERNATE_PAYMENT == 'y') {

        await payments.insertOne({
            name: session.user.name,
            //@ts-ignore
            ref_id: referenceID,
            amount: (pass.INRcost * 100 * costMultiplier),
            email: session.user.email,
            short_url: "/upi",
            status: "created",
            p_id: "UPI",
            type: pass.type,
            refCode: referralCode,
            // @ts-ignore
            contact: decoded.contact || null
        });

        // return the link to the upi page to page.sevelte which will just redirect to the link which is supplied
        return { link: "/upi", rcodestatus: referralStatus };
    }

    let razorpayLink = await razorInstance.paymentLink.create({
        reference_id: referenceID,
        amount: pass.INRcost * 100 * costMultiplier,
        currency: "INR",
        accept_partial: false,
        description: `Falak SURGE 2023 ${ pass.name } pass`,

        customer: {
            name: session.user.name || "Anonymous",
            email: session.user.email || "falak@mirblrfest.in",
            contact: decoded.contact || "+91" + "0000000000"
        },

        notify: {
            email: true,
            sms: false
        },

        reminder_enable: false,
        notes: {
            name: session.user.name || "Anonymous",
            type: queried_type,
            sessionemail: session.user.email || "noneprovided",
            refcode: referralCode,
        },

        callback_url: process.env.ORIGIN + "/callback/pay/" + referenceID,
        callback_method: 'get'
    }).catch((err) => {
        console.error(err)
        throw redirect(302, "/book?cancelled");
    });

    await payments.insertOne({
        //@ts-ignore
        ref_id: razorpayLink.reference_id,
        amount: pass.INRcost * 100 * costMultiplier,
        email: session.user.email,
        short_url: razorpayLink.short_url,
        status: razorpayLink.status,
        p_id: razorpayLink.id,
        type: pass.type,
        refCode: referralCode,
        // @ts-ignore
        contact: decoded.contact || null
    });

    return { link: razorpayLink.short_url, rcodestatus: referralStatus };
};
