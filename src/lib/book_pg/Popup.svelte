<script>


	import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import bgimg from "../../assets/starsbg.svg"
	import { Warning } from "postcss";
	import EventTile from "$lib/events_pg/EventTile.svelte";
    /**
	 * @type {any}
	 */
     export let innerText;
    /**
	 * @type {any}
	 */
     export let title;

     export let category;

     const bgImage = `${bgimg}`;

     let noEvent
     let noPhNum
     let noTeamDeets

     let phnum = ""
     let extradat = ""
     let refcode = ""
     let eventChosen = ""

     let sbbtn
     let gval
     let gsel
     let defevent
     let selevbox
    
     onMount( ()=> {
    
        document.addEventListener('input', ()=>{
            phnum = phnum.replaceAll(/[^0-9]/g,"")
            refcode = refcode.toUpperCase().replaceAll(/[^A-Z0-9]/g,"")
        })

        if(browser){
            defevent.selected = true
            
            setInterval(() => {
                gsel.disabled = (phnum.length < 10)
                selevbox.disabled = (gval == "")
                sbbtn.disabled = !(gval != "" && eventChosen != "" && phnum.length == 10)
            }, 100);

    }
     })

     const sendDat = () => {
        noPhNum.classList.add("hidden")
        if(phnum == "" || phnum.length != 10){
            noPhNum.classList.remove("hidden")
            return
        }
        noEvent.classList.add("hidden")
        if(eventChosen == "" && (title.toLowerCase().includes("flagship") || title.toLowerCase().includes("esports"))){
            noEvent.classList.remove("hidden")
            return
        }
        noTeamDeets.classList.add("hidden")
        if(extradat.trim() == "" && title.toLowerCase().includes("flagship")){
            noTeamDeets.classList.remove("hidden")
            return
        }

        let data = {
            type: eventChosen,
            event: eventChosen,
            
            phnum: phnum,
            refcode: "",
            
        }


        dispatch2("book",data)
     }

     const passarray = [
    
    //mens

    {
        type: "SPORT_FB_M",
        name: "Football (Men's/Team)",
        INRcost: 200,
        open: false
    },

    {
        type: "SPORT_BB_M",
        name: "Basketball (Men's/Team)",
        INRcost: 600,
        open: false
    },

    {
        type: "SPORT_VB_M",
        name: "Volleyball (Men's/Team)",
        INRcost: 200,
        open: false
    },

    {
        type: "SPORT_TN_M",
        name: "Tennis (Men's/Team)",
        INRcost: 150,
        open: false
    },

    {
        type: "SPORT_TT_M",
        name: "Table Tennis (Men's/Team)",
        INRcost: 400,
        open: false
    },

    //womens

    {
        type: "SPORT_BB_F",
        name: "Basketball (Women's/Team)",
        INRcost: 200,
        open: false
    },

    {
        type: "SPORT_TB_F",
        name: "Throwball (Women's/Team)",
        INRcost: 600,
        open: false
    },

    {
        type: "SPORT_TN_F",
        name: "Tennis (Women's/Singles)",
        INRcost: 200,
        open: false
    },

    {
        type: "SPORT_TT_F",
        name: "Table Tennis (Women's/Singles)",
        INRcost: 150,
        open: false
    },


    //gender neutral

    
    {
        type: "SPORT_ATH",
        name: "Athletics",
        INRcost: 400,
        open: false
    },

    {
        type: "SPORT_CHS",
        name: "Chess",
        INRcost: 400,
        open: false
    }


];
let isSubmitDisabled = true

const vpassarr2 = []



let booktext = "Enter Details"
const upBkTxt = (amount = 0) => {
    if(amount == 0){
        booktext = "Enter Details"
    }
    else{
        booktext = "Pay ₹" + amount
    }
}


    const dispatch = createEventDispatcher()
    const dispatch2 = createEventDispatcher()
    
</script>


<div class=" fixed top-0 left-0 z-[11] w-screen max-xs:w-[600px] h-screen flex items-center justify-center font-normal fadeinSlow ">
    
    <div class=" bg-[#1e1e1e] relative  p-2 rounded-2xl  max-md:font-semibold text-center max-md:text-md z-[9] max-w-[20%] max-sm:max-w-[60%] max-xs:max-w-[80%] max-md:max-w-[40%]  max-md:text-sm max-xl:max-w-[30%] max-md:my-[10%] overflow-hidden" >
       
        <div class=" from-[#9c8494] via-[#d0b4e0] to-[#ada0c7] bg-gradient-to-r text-transparent bg-clip-text text-center text-sm p-2">
            For a team event, only the<br>team leader needs a pass.
        </div>
       
        <!--error boxes, hidden by default-->
        <div class=" text-red-500 font-bold w-full animate-bounce mt-2 hidden" bind:this={noPhNum}> Please enter your phone number</div>
        <div class=" text-red-500 font-bold w-full animate-bounce mt-2 hidden" bind:this={noEvent}> Please select an event</div>
        <div class=" text-red-500 font-bold w-full animate-bounce mt-2 hidden" bind:this={noTeamDeets}> Please enter your team's contact details</div>
        <!--inputs-->
        <div class=" text-white font-extralight">
            
            <div class=" px-4 sm:px-6">
                <input placeholder="Phone Number" pattern="\d*" class=" p-2 max-sm:text-sm placeholder:max-md:text-sm w-full bg-transparent outline-none duration-200 caret-[#ffffff5b] placeholder:text-white border-b-2 " bind:value={phnum} type="text" maxlength="10">
                {#if category == "SPORTS"}
                    <select bind:value={gval} bind:this={gsel} class=" disabled:opacity-30 w-full bg-transparent mt-4 p-2 border-b-2">
                        <option class=" bg-slate-700 text-opacity-70" disabled selected value="">Select your gender</option>
                        <option class=" bg-slate-700" value="M">Male</option>
                        <option class=" bg-slate-700" value="F">Female</option>
                    </select>
                    <select bind:value={eventChosen} bind:this={selevbox} class=" disabled:opacity-30 w-full bg-transparent mt-4 p-2 border-b-2 placeholder:text-sm">
                        <option bind:this={defevent} class=" bg-slate-700 text-sm" selected disabled value="">Select an event</option>
                        {#each passarray as pass, i}
                            {#if pass.type.endsWith("_" + gval) || pass.type.endsWith("_ATH") || pass.type.endsWith("_CHS")}
                                <option class=" bg-slate-700 text-xs" value={pass.type} on:click={() => {upBkTxt(pass.INRcost)}}>{pass.name + " - ₹" + pass.INRcost}</option>
                            {/if}
                        {/each}
                    </select>
                {:else}
                
                {/if}
            </div>
             
           
        </div>
        <div class="w-full text-center mt-4  font-semibold from-[#9c8494] via-[#d0b4e0] to-[#ada0c7] bg-gradient-to-r text-transparent bg-clip-text text-xs px-3 ">Press anywhere outside to dismiss</div>
        <button class=" w-fit font-normal text-center  bg-white bg-opacity-[2%]  rounded-lg p-2 text-md  my-4 disabled:opacity-50 opacity-100 disabled:scale-100 scale-105 transition-all duration-300  " bind:this={sbbtn} on:click={sendDat}>
            <div class=" w-full text-center text-xl font-normal  bg-clip-text text-transparent bg-gradient-to-r from-[#2058b7] via-[#aa48a0] to-[#a0bdc27f]">{booktext}</div>
        </button>
    </div> 
    <button class=" pointer-events-auto fixed backdrop-blur-md top-0 left-0 h-screen w-screen cursor-pointer fadeinSlow" on:click={() => {dispatch("close",{ details: "close"})}}>

    </button>  
</div>


<style>
            .fadeinSlow{
        animation-name: slowFadeIn;
        animation-duration: 250ms;
        animation-iteration-count: 1;
        animation-fill-mode: forward;
    }

    .bgstars{
        background-image: image();
    }
    

    @keyframes slowFadeIn{
            
            0%{
            transform: translateY(-50px);
            opacity: 0;
            }

            100%{
            transform: translateY(0px);
            opacity: 100%;
            }


    }

    
    
</style>