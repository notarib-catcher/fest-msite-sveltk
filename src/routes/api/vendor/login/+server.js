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
	const vendorAuthKey = jsonData['vendorAuthKey'];
	const foundAccount = await fcVendors.findOne({ vendor_auth_key: vendorAuthKey, suspended: false });
	console.log(foundAccount);
	if (foundAccount != null) {
		return json({
			status: '200',
			detail: {
				userState: {
					//@ts-ignore
					userName: foundAccount['vendor_name'],
					//@ts-ignore
					joinCode: foundAccount['vendor_auth_key']
				}
			}
		});
	} else {
		return json({ status: '401', detail: 'unauthorized (wrong join code or account suspended)' });
	}
};
