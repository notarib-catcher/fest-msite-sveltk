import { json } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const cstring = process.env.MONGO_URL;
//@ts-ignore
const client = new MongoClient(cstring);
const database = client.db('food_coupons');
// const fcAccounts = database.collection('fc_accounts');
// const fcTypes = database.collection('fc_types');
// const fcGeneratedCoupons = database.collection('fc_generated_coupons');
const fcAccounts = database.collection('fc_accounts');
const fcVendors = database.collection('fc_vendors');
const projection = {
	_id: 0
};
const option = {
	projection: projection
};

export const POST = async (event) => {
	const receivedText = await event.request.text();
	const jsonData = JSON.parse(receivedText);
	const vendorAuthKey = jsonData['vendorAuthKey'];
	const couponCode = jsonData['code'];
	const foundVendor = await fcVendors.findOne({
		vendor_auth_key: vendorAuthKey,
		suspended: false
	});
	if (foundVendor != null) {
		const foundAccount = await fcAccounts.findOne({
			curr_code: parseInt(couponCode)
		});
		if (foundAccount != null) {
			const couponCodeValue = foundAccount['in_wallet'];
			return json({
				status: '200',
				detail: { msg: 'Success', codeValue: couponCodeValue, from: foundAccount['email_id'] }
			});
		} else {
			return json({ status: '422', detail: 'invalid coupon code' });
		}
	} else {
		return json({ status: '403', detail: 'unauthorized (wrong join code or account suspended)' });
	}
};
