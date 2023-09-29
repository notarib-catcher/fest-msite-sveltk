import { redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv' ;
dotenv.config()
import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL

// @ts-ignore
const client = new MongoClient(cstring);
const databaseRegs = client.db("teams");
const t_soloregs = databaseRegs.collection('t_soloregs')
const t_teams = databaseRegs.collection('t_teams')
const t_events = databaseRegs.collection('t_events')
const database = client.db(process.env.MONGO_DB_NAME)
const passes = database.collection('passes')

const allowedPasses = {
    "S_FB_M" : ["SPORT_FB_M"], //Team event
    "S_BB_M" : ["SPORT_BB_M"], //Team event
    "S_VB_M" : ["SPORT_VB_M"], //Team event
    "S_TN_M" : ["SPORT_TN_M"], //Team event
    "S_TT_M" : ["SPORT_TT_M"], //Team event
    "S_BB_F" : ["SPORT_BB_F"], //Team event
    "S_TB_F" : ["SPORT_TB_F"], //Team event
    "S_TN_F" : ["SPORT_TN_F"], 
    "S_TT_F" : ["SPORT_TT_F"],
    "S_ATH" : ["SPORT_ATH"],
    "S_CHS" : ["SPORT_CHS"],
    "C_PRO" : ["CLTR_PRO"], //No need to register
    "C_BOB" : ["CLTR_BOB"], //Team event
    "C_GRD" : ["CLTR_GRD"], //Team event
    "C_FAS" : ["CLTR_FAS"],
    "C_STRSPL" : ["CLTR_PRO"],
    "C_THESHD" : ["CLTR_PRO"],
    "C_MNDSCR" : ["CLTR_PRO"],
    "C_MKTMHM" : ["CLTR_PRO"],
    "C_RANCOM" : ["CLTR_PRO"],
    "C_BTBLBD" : ["CLTR_PRO"],
    "C_NATNIR" : ["CLTR_PRO"],
    "C_FCSFRM" : ["CLTR_PRO"],
    "C_RMXRYL" : ["CLTR_PRO"],
    "C_MNGODY" : ["CLTR_PRO"],
    "C_BSHBTL" : ["CLTR_PRO"],
    "C_QZAPLZ" : ["CLTR_PRO"],
    "C_ZENITH" : ["CLTR_PRO"],
    "C_STRBET" : ["CLTR_PRO"],
    "C_BRNWAV" : ["CLTR_PRO"],
    "C_SAARANG" : ["CLTR_PRO"],
    "ES_BGDMHM" : ["ESPORTS"],
    "ES_VALRIS" : ["ESPORTS"],
    "ES_CODEXE" : ["ESPORTS"],
    "ES_CRWQST" : ["ESPORTS"],
    "ES_GOLQST" : ["ESPORTS"]
}


export async function load(event){
    
    let returned = {
        eventID: event.params.id,
        session: false,
        reg: {
            team: {
                reg:false,
                owner:false
            },
            solo: false
        },
        pass: false,
        needreg: false
    }
    
    let {params} = event
    const eventID = params.id



    //check if event exists
    let eventDoc = null
    try{
        eventDoc = await t_events.findOne({_id: eventID}).catch(error => console.error)
    }
    catch(error){
        console.error(error)
    }
    
    if(!eventDoc){
        throw redirect(302, "/")
    }
  

    returned.needreg = eventDoc.needreg

    //beyong this point, we cannot redirect. We MUST return some value.
    const session = await event.locals.getSession();
	if (!session?.user) {
		//@ts-ignore
		return returned
	}

    //user is logged in
    returned.session = true


    //check for teams - since people can join teams without owning a pass, this is first
    for(event of allowedPasses[eventID]){
        const pass = await passes.findOne({type: event, email:session.user.email})
    
        if(pass){
            returned.pass = true
            break
        }
    }

    const teams_query = {
        members: {
            $elemMatch:{
                email: session.user.email
            }
        },
    }


    const teams = await t_teams.find(teams_query).toArray()

    for(let team of teams){
        if(team.event == eventID){
            returned.reg.team.reg = true
            if(team.owner == session.user.email){
                returned.reg.team.owner = true
                return returned
            }
        }
    }

    
    if(!eventDoc.solo){
        //registered as team or doesnt need to register AND has pass
        return returned
    }




    //check solo regs
    
    const soloreg = await t_soloregs.findOne({event:eventID, email:session.user.email})

    if(soloreg){
        returned.reg.solo = true
    }

    //no solo reg, check team regs

    

    return returned

}