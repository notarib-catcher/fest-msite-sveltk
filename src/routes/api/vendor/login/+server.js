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
	const receivedText = await event.request.text();
	// const symbolKey = Reflect.ownKeys(formData).find((key) => key.toString() === 'Symbol(state)');
	// @ts-ignore
	const jsonData = JSON.parse(receivedText);
	const vendorAuthKey = jsonData['vendorAuthKey'];
	const foundAccount = await fcVendors.findOne({
		vendor_auth_key: vendorAuthKey,
		suspended: false
	});
	if (foundAccount != null) {
		return json({
			status: '200',
			detail: {
				authState: {
					//@ts-ignore
					userName: foundAccount['vendor_name'],
					//@ts-ignore
					vendorAuthKey: foundAccount['vendor_auth_key']
				},
				vendorState: {
					balance: foundAccount['balance'],
					numberOfCouponsScanned: foundAccount['number_of_coupons_scanned']
				}
			}
		});
	} else {
		return json({ status: '403', detail: 'unauthorized (wrong join code or account suspended)' });
	}
};
