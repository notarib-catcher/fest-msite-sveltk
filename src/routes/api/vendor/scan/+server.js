import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';
import * as dotenv from 'dotenv';
dotenv.config();

const cstring = process.env.MONGO_URL;
//@ts-ignore
const client = new MongoClient(cstring);
const database = client.db('food_coupons');
const fcAccounts = database.collection('fc_accounts');
const fcVendors = database.collection('fc_vendors');
const fcLogs = database.collection('fc_logs');

const projection = {
	_id: 0
};
const option = {
	projection: projection
};

//@ts-ignore
export const POST = async (event) => {
	const jsonData = await event.request.json();
	const vendorAuthKey = jsonData['vendorAuthKey'];
	const couponCode = jsonData['couponCode'];
	const vendorName = jsonData['vendorName'];
	const foundVendor = await fcVendors.findOne({
		vendor_name: vendorName,
		vendor_auth_key: vendorAuthKey,
		suspended: false
	});

	if (!couponCode) {
		return json({ status: '400', detail: 'please enter a valid code' });
	}

	if (foundVendor != null) {
		const foundAccount = await fcAccounts.findOne({
			curr_code: parseInt(couponCode)
		});
		if (foundAccount != null) {
			fcAccounts.updateOne(
				{ email_id: foundAccount['email_id'] },
				{ $set: { in_wallet: 0, curr_code: '' } }
			);
			fcVendors.updateOne(
				{ vendor_auth_key: vendorAuthKey, vendor_name: foundVendor['vendor_name'] },
				{
					$set: {
						balance: foundVendor['balance'] + foundAccount['in_wallet'],
						number_of_coupons_scanned: foundVendor['number_of_coupons_scanned'] + 1
					}
				}
			);

			fcLogs.insertOne({
				type: 'REDEEMC',
				user_acc: foundAccount['email_id'],
				user_acc_bal: foundAccount['balance'],
				vendor_acc: foundVendor['vendor_name'],
				vendor_acc_bal: foundVendor['balance'] + foundAccount['in_wallet'],
				wallet_amount: foundAccount['in_wallet'],
				wallet_code: foundAccount['curr_code'],
				new_wallet_amount: 0,
				new_wallet_code: null,
				timestamp: new Date()
			});

			return json({
				status: '200',
				detail: {
					msg: 'code scanned successfully!',
					vendorState: {
						balance: foundVendor['balance'] + foundAccount['in_wallet'],
						numberOfCouponsScanned: foundVendor['number_of_coupons_scanned'] + 1
					}
				}
			});
		} else {
			return json({ status: '422', detail: 'Entered wrong code' });
		}
	} else {
		return json({ status: '403', detail: 'unauthorized (suspended)' });
	}
};
