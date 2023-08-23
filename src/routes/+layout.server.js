import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL

// @ts-ignore
const client = new MongoClient(cstring);
const database = client.db("food_coupons");
const fcAccounts = database.collection('fc_accounts');
const projection = {
    _id: 0, email_id: 1, balance: 1, in_wallet: 1,
}
const options = {
    projection: projection
}


//@ts-ignore
export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		return { fcAllowed: false , session: session};
	}

	const query = { email_id: { $eq: session.user.email } };
	const cursor = fcAccounts.find(query, options);
	const foundAccount = await cursor.toArray()

	if (foundAccount.length > 0) {
		return { fcAllowed: true , session: session};
	} else {
    return {fcAllowed: false, session: session};
  }
};
