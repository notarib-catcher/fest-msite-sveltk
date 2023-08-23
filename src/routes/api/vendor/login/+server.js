import { json } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const cstring = process.env.MONGO_URL;
//@ts-ignore
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
// const fcAccounts = database.collection('fc_accounts');
// const fcTypes = database.collection('fc_types');
// const fcGeneratedCoupons = database.collection('fc_generated_coupons');
const fcVendors = database.collection('fc_vendors');
const projection = {
	_id: 0
};
const option = {
	projection: projection
};

//@ts-ignore
export const POST = async (event) => {
	const jsonData = await event.request.json();
	// const symbolKey = Reflect.ownKeys(formData).find((key) => key.toString() === 'Symbol(state)');
	//@ts-ignore
	const joinCode = jsonData['joinCode'];
	const query = { join_code: { $eq: joinCode } };
	const cursor = fcVendors.find(query, option);
	const foundAccount = await cursor.toArray();
	if (foundAccount.length > 0) {
		return json({
			status: '200',
			detail: {
				userState: {
					userName: foundAccount[0]['vendor_name'],
					joinCode: foundAccount[0]['join_code']
				}
			}
		});
	} else {
		return json({ status: '401', detail: 'unauthorized (wrong join code)' });
	}
};
