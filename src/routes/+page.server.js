import { redirect } from '@sveltejs/kit'
import * as dotenv from 'dotenv' ;
dotenv.config()

export const load =  async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {
    if(process.env.REDIRECT_ALL_TRAFFIC == "y"){
        // @ts-ignore
        throw redirect(302, process.env.REDIRECT_URL)
    }   
}