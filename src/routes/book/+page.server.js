import * as dotenv from 'dotenv';
import { redirect } from '@sveltejs/kit';
import  Razorpay  from 'razorpay'
dotenv.config();

import { MongoClient } from 'mongodb';
// mongo db url
const cstring = process.env.MONGO_URL;

var razorInstance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID , key_secret: process.env.RAZORPAY_SECRET })

// @ts-ignore
// setting up mongo db
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const passes = database.collection('passes');
const payments = database.collection('payments');
const projection = {
	_id: 0,
	type: 1
};
/* what is this ? */
const options = {
	projection: projection
};

export const load = async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {
	// get local session details to check if user is signed in and get his pass if it exists
	const session = await event.locals.getSession();
	// if user is not signed in return below dictionary (most probably default data so that frontend is displayed properly)
	if (!session?.user) {
		/* what is process.env.ORIGIN */
		return { top_pass: {}, payment: null, origin: process.env.ORIGIN };
	}
	// query to find passes in the passes collection
	const query = { email: { $eq: session.user.email }, generated: { $eq: true } };
	// query to find out if the payment is completed or not ?
	const querypayments = { email: { $eq: session.user.email }, status: { $eq: 'created' } };

	const cursor = await passes.find(query, options);
	const existingPayment = await payments.findOne(querypayments);

	if (existingPayment) {
		// if payment exists
		// @ts-ignore
		existingPayment._id = existingPayment?._id.toString();
	}

	// if payments exists then convert the returned passes into an array
	const foundpasses = await cursor.toArray();
	// check if the array actually contains any pass or not
	if (foundpasses.length > 0) {
		// basically a for each loop
		let fpass = foundpasses.filter((pass) => {
			// filtering out full_access and staff type passes
			return pass.type == 'FULL_ACCESS' || pass.type == 'STAFF';
		});

		if (fpass.length > 0) {
			// if the pass type is full access or staff type return below object
			return { top_pass: fpass[0], payment: existingPayment, origin: process.env.ORIGIN };
		}
	}
	// if foundpasses doesn't contain any staff or full access type pass return the below object
	// it is also possible that the person has no pass available hence the use of "|| {}"

	/* what exactly is present in exisitingPayment ? */
	return { top_pass: foundpasses[0] || {}, payment: existingPayment, origin: process.env.ORIGIN };
};

export const actions = {
	default: async (event) => {
		const session = await event.locals.getSession();
		if (!session?.user) {
			throw redirect(302, "/")
		  }

		const request = event.request
        const data = await request.formData()
        const ref_id = data.get('ref_id')
		let existingPayment = await payments.findOne({ ref_id : { $eq: ref_id }, email: { $eq: session.user.email }, status: { $eq: "created" }})
	
		if(existingPayment){
			
	
			// not required since razor pay is no longer used
			if(existingPayment.p_id != "UPI"){
			  let plink = await razorInstance.paymentLink.fetch(existingPayment.p_id)

			  if(!plink){
				return { success: true }
			  }

			  

			  console.log("PL found " + ref_id)

			  if(plink.status == "paid"){
				throw redirect(302,'/callback/pay/' + ref_id)
			  }

			  await payments.findOneAndUpdate({
				p_id: existingPayment.p_id
				},{
					$set:{
						status: plink.status
					}
			  })
	
			  
	
			  
			}
			
			
		}

		throw redirect(302, '/book')
	}
}
