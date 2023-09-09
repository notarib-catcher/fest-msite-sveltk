import { redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL;

// @ts-ignore
const client = new MongoClient(cstring);

// important -> PriorityFieldOnWebsite field must be given a value before publishing on strapi otherwise it won't show up on the website
// important -> Event heads don't have the ability to publish changes, they can create, edit, update, delete but can't publish
// important -> publishing will be done by a tech team members by adding values to PriorityOnWebsite, CScheme and EventType
// important -> Event Heads won't be able to set values to the fields mentioned above.
// (implement the author role same as done locally)
// important -> All event heads should be given the role author

// if new content is added to strapi the website must be reloaded once to see the changes

// these are basically headings which are displayed, If headings are not to be displayed just remove the displayName field,
// the events will still be sorted wrt PriorityOnWebsite field.
// important -> priority in strapi should be in one of the below categories otherwise it won't show up on the website
const priorityCategories = {
	flagship: { from: 1000, to: 2000, displayName: 'Flagship' },
	free: { from: 3000, to: 4000, displayName: 'Free for all' }
};

export async function load() {
	// general api endpoint structure -> api/{collection name}
	let events = await getCollectionStrapi('api/event-cards');
	//@ts-ignore
	events.detail.sort((a, b) => a.attributes.PriorityOnWebsite - b.attributes.PriorityOnWebsite);
	// console.log(events)
	return { events: events, priorityCategories: priorityCategories };
}
//@ts-ignore
async function getCollectionStrapi(endpoint) {
	let response = await fetch(`${process.env.STRAPI_ENDPOINT}/${endpoint}`, {
		method: 'GET',
		headers: new Headers({
			Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
			'Content-Type': 'application/json'
		})
	})
	if(!response.ok){
		return {status: "failure", detail: response.status};
	} else {
		let jsonData = await response.json();
		// jsonData.data is a list. All the fields are present under jsonData.data[0].attributes (for first element)
		return {status: "success", detail: jsonData.data};
	}
}
