import { redirect } from '@sveltejs/kit'

export const load =  async (/** @type {{ locals: { getSession: () => any; }; }} */ event) => {
    throw redirect(302, "https://linktr.ee/techsolstice")
}