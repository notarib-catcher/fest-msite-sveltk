<script>
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
    import QRCode from "../../lib/common/QRJS.svelte"


    const passNameDisplay = {
        //legacy pass - all access doesnt exist anymore
      "SPORT_FB_M": "Football (Team pass)",
      "SPORT_BB_M": "Basketball (Team pass)",
      "SPORT_VB_M": "Volleyball (Team pass)",
      "SPORT_TN_M": "Tennis (Doubles)",
      "SPORT_TT_M": "Table Tennis (Doubles)",
      "SPORT_BB_F": "Basketball (Team pass)",
      "SPORT_TB_F": "Throwball (Team pass)",
      "SPORT_TN_F": "Tennis (Singles)",
      "SPORT_TT_F": "Table Tennis (Singles)",
      "SPORT_ATH": "Athletics",
      "SPORT_CHS": "Chess (Team pass)",
        //normal passes
      "CLTR_PRO":  "Proshow and Cultural",
      "SUP_PRO":  "SURGE VIP PASS",
      "CLTR_GRD": "Group Dance (Team)",
      "CLTR_BOB": "Band Battle (Team)",
      "CLTR_FAS": "Fashion Show",
      "ESPORTS": "Esports",
      //staff access
      "STAFF" : "Event staff"
    }
// @ts-nocheck

    /**
     * @type {Array<string>}
     */
    export let codeDataArr;
     /**
     * @type {Array<string>}
     */
    export let typeArr;

    let error = false;

    
    
    
    let cursor = 0;
    let currentData = codeDataArr[0];

    const next = () => {
        cursor = (cursor + 1)% codeDataArr.length
    }

    $: currentData = codeDataArr[cursor]

    /**
	 * @type {any[]}
	 */
    const nameArr = []

    const convertTypeToName = (type = "Custom") => {
        // @ts-ignore
        nameArr.push(passNameDisplay[type] || "Custom Pass")
    }

    typeArr.map(convertTypeToName)

    if(browser){
        
        if(codeDataArr.length != typeArr.length){
            codeDataArr = []
            error = true;
        }

        if(codeDataArr.length == 0){
            setTimeout(
                () => {
                    goto('/book')
                }, 1500)   
        }   
    }

</script>
<div class=" flex items-center justify-center h-screen w-screen text-white ">
    {#if codeDataArr.length == 0}
        <div>
            {#if !error}
            No passes to display<br><br>Just made a payment?<br>Processing payments can take some time.
            {:else}
            Error, Please contact support
            {/if}
        </div>
    {:else}
        <div class=" mx-2 absolute text-white bg-gradient-to-tr from-[#49243d] via-[#442b51] to-[#2c125c] flex flex-col px-10 pb-10 pt-4 rounded-lg">
            <div class="w-full text-center bg-clip-text text-transparent bg-gradient-to-r text-2xl font-semibold via-[#59e8f8] to-[#6088f9] from-[#6088f9]  mb-4">
                Your Pass{#if codeDataArr.length > 1}es{/if}
            </div>
            <div class=" bg-[#e6e6e6] px-4 pt-4 rounded-lg shadow-2xl">
                {#key currentData}
                    <QRCode codeValue = {currentData} squareSize = {300}/>
                {/key}
                <div class="w-full text-center bg-clip-text bg-gradient-to-t text-transparent from-[#49243d] via-[#442b51] to-[#2c125c] text-2xl font-extrabold  mt-2 mb-3 ">
                    {nameArr[cursor]}
                </div>

            </div>
            
            {#if codeDataArr.length > 1}
                <div class="w-full text-center bg-clip-text text-transparent bg-gradient-to-r text-2xl font-semibold via-[#59e8f8] to-[#6088f9] from-[#6088f9]  mt-4">
                    <button on:click={next} class=" w-fit px-4 rounded-lg h-full active:text-zinc-800 bg-clip-border duration-200">next</button>
                </div>
            {/if}
            <div class=" w-full text-center pt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#c7acac] via-[#d6bfe2] to-[#7e7b83]">
                This QR grants event access.<br>Take a screenshot, <i>Just in case.</i>
            </div>
            
        </div>
    {/if}
</div>

