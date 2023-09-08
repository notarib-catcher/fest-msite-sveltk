import { redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL;

// @ts-ignore
const client = new MongoClient(cstring);

const priorityCategories = {
	flagship: { from: 1000, to: 2000, displayName: 'Flagship' },
	free: { from: 3000, to: 4000, displayName: 'Free for all' }
};

const eventCategories = {
	sports: 'Sports',
	cultural: 'Cultural'
};

const events = [
	{
		// used for styling purposes
		eventCategory: eventCategories.sports,
		// name displayed
		eventName: 'Football',
		eventDescription: 'Play Football',
		// determines the category, place and position on page
		priority: 1001
	},
	{
		eventCategory: eventCategories.cultural,
		eventName: 'ProShow',
		eventDescription: 'Dance party',
		priority: 1002
	},
    {
        eventCategory: eventCategories.cultural,
        eventName: 'Normal',
        eventDescription: 'Normal event',
        priority: 3001
    }
];

export async function load() {
    // sort events in order based on their priority
    //@ts-ignore
	events.sort((a, b) => a.priority - b.priority);
	console.log(events);
    return {events: events, priorityCategories: priorityCategories};
}
