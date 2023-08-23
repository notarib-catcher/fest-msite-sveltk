import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { redirect } from '@sveltejs/kit';
dotenv.config();

const cstring = process.env.MONGO_URL;
//@ts-ignore
const client = new MongoClient(cstring);
const database = client.db(process.env.MONGO_DB_NAME);
const fcAccounts = database.collection('fc_accounts');
const fcTypes = database.collection('fc_types');
const fcGeneratedCoupons = database.collection('fc_generated_coupons');
const projectionAccount = {
	_id: 0,
	email_id: 1,
	balance: 1,
	in_wallet: 1
};
const optionsAccount = {
	projection: projectionAccount
};

const projectionTypes = {
	_id: 0
};
const optionsTypes = {
	projection: projectionTypes
};

export const load = async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		//@ts-ignore
		throw redirect(301, process.env.ORIGIN);
	}

	const query = { email_id: { $eq: session.user.email } };
	const cursor = fcAccounts.find(query, optionsAccount);
	const foundAccount = await cursor.toArray();

	const queryCoupon = { email_id: { $eq: session.user.email } };
	const cursorCoupon = fcGeneratedCoupons.find(queryCoupon, optionsTypes);
	const foundCoupons = await cursorCoupon.toArray();

	if (foundAccount.length > 0) {
		const cursor = fcTypes.find();
		const types = await cursor.toArray();
		//@ts-ignore
		delete types[0]['_id'];
		let returnObject = {
			fcAllowed: true,
			session: session,
			fcTypes: types[0],
			generatedCode: null
		};
		if (foundCoupons.length > 0) {
			foundCoupons.forEach((coupon) => {
				if (coupon['banned'] == false && coupon['scanned'] == false) {
					//@ts-ignore
					returnObject.generatedCode = coupon['code'];
					return returnObject;
				}
			});
		}
		// console.log(Object.keys(types[0]).length);
		//@ts-ignore
		return returnObject;
	} else {
		//@ts-ignore
		throw redirect(301, process.env.ORIGIN);
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	genCode: async (event) => {
		const session = await event.locals.getSession();
		if (!session?.user) {
			//@ts-ignore
			throw redirect(301, process.env.ORIGIN);
		}
		const formData = await event.request.formData();
		const symbolKey = Reflect.ownKeys(formData).find((key) => key.toString() === 'Symbol(state)');
		// @ts-ignore
		// console.log(formData[symbolKey]);
		let generatedCode;
		while (true) {
			generatedCode = Math.random().toString(36).substring(2, 6);
			const query = { code: { $eq: generatedCode } };
			const cursor = fcGeneratedCoupons.find(query);
			const foundCodes = await cursor.toArray();

			if (foundCodes.length == 0) {
				break;
			} else {
				continue;
			}
		}

		//@ts-ignore
		const emailId = session.user.email;
		//@ts-ignore
		const query = { email_id: { $eq: emailId } };
		const cursor = fcAccounts.find(query, optionsAccount);
		const details = await cursor.toArray();

		const currentInWallet = details[0]['in_wallet'];
		const currentBalance = details[0]['balance'];
		//@ts-ignore
		const foodCouponValue = parseInt(formData[symbolKey][1]['value'].split(' ')[1]);

		if (details[0]['in_wallet'] == 0) {
			fcAccounts.updateOne(
				{ email_id: emailId },
				{ $set: { balance: currentBalance - foodCouponValue, in_wallet: foodCouponValue } }
			);

			fcGeneratedCoupons.insertOne({
				//@ts-ignore
				email_id: emailId,
				code: generatedCode,
				//@ts-ignore
				value: foodCouponValue,
				timestamp: new Date().getTime(),
				scanned: false,
				banned: false,
				scanned_by: "null",
			});
			return { generatedCode: generatedCode, success: true };
		} else {
			const query = { email_id: { $eq: emailId }, scanned: { $eq: false } };
			const cursor = fcGeneratedCoupons.find(query, optionsTypes);
			const foundCoupons = await cursor.toArray();
			foundCoupons.forEach((coupon) => {
				if (coupon['banned'] == false && coupon['scanned'] == false) {
					return { generatedCode: coupon['code'], success: true };
				} else {
					return { generatedCode: null, success: false };
				}
			});
		}
	},
	invalidateCurrentCode: async (event) => {
		const session = await event.locals.getSession();
		if (!session?.user) {
			//@ts-ignore
			throw redirect(301, process.env.ORIGIN);
		}
		const emailId = session.user.email;
		const queryCoupon = {
			email_id: { $eq: emailId },
			scanned: { $eq: false },
			banned: { $eq: false }
		};
		const cursorCoupon = fcGeneratedCoupons.find(queryCoupon, optionsTypes);
		const foundCoupons = await cursorCoupon.toArray();

		const queryAccounts = { email_id: { $eq: emailId } };
		const cursorAccounts = fcAccounts.find(queryAccounts, optionsTypes);
		const foundAccount = await cursorAccounts.toArray();
		if (foundCoupons.length > 0) {
			fcGeneratedCoupons.updateOne(
				{ email_id: emailId, scanned: false, banned: false },
				{ $set: { banned: true } }
			);

			fcAccounts.updateOne(
				{ email_id: emailId },
				{
					$set: { balance: foundAccount[0]['balance'] + foundAccount[0]['in_wallet'], in_wallet: 0 }
				}
			);
			return { success: true };
		} else {
			return { success: false };
		}
	}
};
