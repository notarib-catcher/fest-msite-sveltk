<script>


	import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";
    /**
	 * @type {any}
	 */
     export let innerText;
    /**
	 * @type {any}
	 */
     export let title;

     export let type;

     let noEvent
     let noPhNum
     let noTeamDeets

     let phnum = ""
     let extradat = ""
     let refcode = ""
     let eventChosen = ""
     let eventChosen2 = ""

     onMount( ()=> {
        document.addEventListener('input', ()=>{
            phnum = phnum.replaceAll(/[^0-9]/g,"")
            refcode = refcode.toUpperCase().replaceAll(/[^A-Z0-9]/g,"")
        })
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
            event:title,
            extradat: extradat,
            phnum: phnum,
            refcode: refcode,
            eventChosen: eventChosen,
            eventChosen2: eventChosen2
        }

        console.log(data)

        dispatch2("book",data)
     }




    const dispatch = createEventDispatcher()
    const dispatch2 = createEventDispatcher()
    
</script>


<div class=" fixed top-0 left-0 z-[11] w-screen max-xs:w-[600px] h-screen flex items-center justify-center font-normal fadeinSlow ">
    <div class=" bg-black p-4 rounded-2xl  max-md:font-semibold text-center max-md:text-md z-[9] max-w-[60%] max-md:max-w-[80%] max-md:my-[10%]">
        <div class=" w-full font-extrabold whitespace-nowrap    text-center mb-6 from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r max-md:bg-gradient-to-l bg-clip-text text-transparent text-4xl">
            {title}
        </div>
        <div class=" w-full max-md:text-sm whitespace-normal justify-evenly text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r max-md:bg-gradient-to-l bg-clip-text text-transparent text-2xl">
            {innerText}
        </div>
        <!--error boxes, hidden by default-->
        <div class=" text-red-500 font-bold w-full animate-bounce mt-2 hidden" bind:this={noPhNum}> Please enter your phone number</div>
        <div class=" text-red-500 font-bold w-full animate-bounce mt-2 hidden" bind:this={noEvent}> Please select an event</div>
        <div class=" text-red-500 font-bold w-full animate-bounce mt-2 hidden" bind:this={noTeamDeets}> Please enter your team's contact details</div>
        <!--inputs-->
        <div class=" text-white font-extralight">
            {#if title.toLowerCase().includes("flagship") || title.toLowerCase().includes("esports")}
            <div class=" m-2">
                Select your preferred event
            </div><select class=" text-center w-full from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r text-black text-2xl font-semibold rounded-lg " bind:value={eventChosen}>
                {#if title.toLowerCase().includes("flagship")}
                <option value="HCKTH">Hackathon</option>
                <option value="THUNT">Treasure Hunt</option>
                <option value="DESGN">Design-a-thon</option>
                {:else if title.toLowerCase().includes("esports")}
                <option value="VALO">Valorant (₹200)</option>
                <option value="CODM">COD Mobile (₹200)</option>
                <option value="CROYL">Clash Royale (₹50)</option>
                <option value="FIFA">FIFA (₹50)</option>
                {/if}
            </select>
            {/if}
            <div class=" m-2">
                Phone number
            </div> <input class=" font-semibold text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r rounded-lg p-2 text-xl text-black w-full " bind:value={phnum} type="text" maxlength="10">
            <div class=" m-2">
                Referral Code (if any)
            </div> <input class=" font-semibold text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r rounded-lg p-2 text-xl text-black w-full " bind:value={refcode} type="text" maxlength="6">
            {#if eventChosen == "HCKTH" || eventChosen == "THUNT" || eventChosen == "DESGN"}
            <div class=" my-2 relative">
                Team member details (Gmail)
            </div> <textarea class=" w-full font-normal text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r rounded-lg p-2 text-md text-black  " bind:value={extradat}></textarea>
            {/if}
        </div>
        <div class="w-full text-center mt-4  font-semibold from-[#9c8494] via-[#d0b4e0] to-[#ada0c7] bg-gradient-to-r text-transparent bg-clip-text text-xs ">Press anywhere outside to dismiss</div>
        <button class=" w-full font-normal text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r rounded-lg p-2 text-md  mt-2  " on:click={sendDat}>
            <div class=" w-full text-center text-xl font-bold text-black">Book now!</div>
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

    .bgGradientCardBLue{
        background-image: linear-gradient(to top right, rgba(101, 201, 243, 0.5), rgba(67, 102, 186, 0.7) , rgba(141, 107, 205, 0.9))
    }
</style>