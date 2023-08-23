import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';
import * as dotenv from 'dotenv';
dotenv.config();

const cstring = process.env.MONGO_URL;
//@ts-ignore
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const fcAccounts = database.collection('fc_accounts');
const fcGeneratedCoupons = database.collection('fc_generated_coupons');
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
	const joinCode = jsonData['joinCode'];
	const couponCode = jsonData['couponCode'];
	const query = { join_code: { $eq: joinCode } };
	const cursor = fcVendors.find(query, option);
	const foundAccount = await cursor.toArray();

	if (foundAccount.length > 0) {
		const output = await fcGeneratedCoupons.findOne({
			code: couponCode,
			scanned: false,
			banned: false,
			scanned_by: 'null'
		});
		if (output != null) {
			fcGeneratedCoupons.updateOne(
				{
					email_id: output['email_id'],
					code: couponCode,
					scanned: false,
					banned: false,
					scanned_by: 'null'
				},
				{ $set: { scanned: true, scanned_by: jsonData['vendorName'] } }
			);

			fcAccounts.updateOne({ email_id: output['email_id'] }, { $set: { in_wallet: 0 } });
			return json({ status: '200', detail: 'code scanned successfully!' });
		} else {
			return json({ status: '422', detail: 'invalid code' });
		}
	} else {
		return json({ status: '401', detail: 'unauthorized' });
	}
};
