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
const fcLogs = database.collection('fc_logs');
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

	const foundAccount = await fcAccounts.findOne({ email_id: session.user.email });

	if (foundAccount != null) {
		const cursor = fcTypes.find();
		const types = await cursor.toArray();
		//@ts-ignore
		delete types[0]['_id'];
		const history = await getLastFiveLogs(session.user.email);
		let returnObject = {
			fcAllowed: true,
			session: session,
			fcTypes: types[0],
			generatedCode: '',
			history: history
		};

		if (foundAccount['curr_code']) {
			returnObject.generatedCode = foundAccount['curr_code'];
		}
		// console.log(Object.keys(types[0]).length);
		//@ts-ignore
		return returnObject;
	} else {
		//@ts-ignore
		throw redirect(301, process.env.ORIGIN);
	}
};

//@ts-ignore
async function getLastFiveLogs(emailId) {
	const cursor = fcLogs
		.find({ user_acc: { $eq: emailId } }, optionsTypes)
		.sort({ timestamp: -1 })
		.limit(5);
	const history = await cursor.toArray();
	// console.log("something");
	return history;
}

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
		const foodCouponValue = parseInt(formData[symbolKey][1]['value'].split(' ')[1]);
		if (foodCouponValue < 0) {
			return { generatedCode: null, success: false };
		}
		let generatedCode;
		while (true) {
			generatedCode = Math.floor(100000 + Math.random() * 900000);
			const foundCode = await fcAccounts.findOne({ code: generatedCode });

			if (foundCode == null) {
				break;
			} else {
				continue;
			}
		}

		//@ts-ignore
		const emailId = session.user.email;
		//@ts-ignore
		const foundAccount = await fcAccounts.findOne({ email_id: emailId });
		if (foundAccount == null) {
			return { generatedCode: null, success: false };
		}

		const currentInWallet = foundAccount['in_wallet'];
		const currentBalance = foundAccount['balance'];
		//@ts-ignore

		if (currentInWallet == 0) {
			if (currentBalance >= foodCouponValue) {
				fcAccounts.updateOne(
					{ email_id: emailId },
					{
						$set: {
							balance: currentBalance - foodCouponValue,
							in_wallet: foodCouponValue,
							curr_code: generatedCode
						}
					}
				);
				fcLogs.insertOne({
					type: 'NEWC',
					user_acc: emailId,
					user_acc_bal: foundAccount['balance'] - foodCouponValue,
					vendor_acc: null,
					vendor_acc_bal: null,
					wallet_amount: currentInWallet,
					wallet_code: foundAccount['curr_code'],
					new_wallet_amount: foodCouponValue,
					new_wallet_code: generatedCode,
					timestamp: new Date()
				});

				return { generatedCode: generatedCode, success: true };
			} else {
				return { generatedCode: null, success: false };
			}
		} else {
			return { generatedCode: foundAccount['curr_code'], success: true };
		}
	},
	invalidateCurrentCode: async (event) => {
		const session = await event.locals.getSession();
		if (!session?.user) {
			//@ts-ignore
			throw redirect(301, process.env.ORIGIN);
		}
		const emailId = session.user.email;

		const foundAccount = await fcAccounts.findOne({ email_id: emailId });
		if (foundAccount != null) {
			fcAccounts.updateOne(
				{ email_id: emailId },
				{
					$set: {
						balance: foundAccount['balance'] + foundAccount['in_wallet'],
						in_wallet: 0,
						curr_code: ''
					}
				}
			);
			fcLogs.insertOne({
				type: 'SUSPC',
				user_acc: emailId,
				user_acc_bal: foundAccount['balance'] + foundAccount['in_wallet'],
				vend_acc: null,
				vend_acc_bal: null,
				wallet_amount: foundAccount['in_wallet'],
				wallet_code: foundAccount['curr_code'],
				new_wallet_amount: 0,
				new_wallet_code: null,
				timestamp: new Date()
			});
			return { success: true };
		} else {
			return { success: false };
		}
	}
};
