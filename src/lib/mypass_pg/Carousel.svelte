<script>
	import { goto } from "$app/navigation";

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

    if(codeDataArr.length != typeArr.length){
        codeDataArr = []
        error = true;
    }

    if(codeDataArr.length == 0){
        goto('/book')
    }

    import QRCode from "../../lib/common/QRJS.svelte"

    let cursor = 0;
    let currentData = codeDataArr[0];


    const next = () => {
        cursor = (cursor + 1)% codeDataArr.length
    }


    $: currentData = codeDataArr[cursor]
</script>
<div class=" flex items-center justify-center h-screen w-screen text-white ">
    {#if codeDataArr.length == 0}
        <div>
            {#if !error}
            No passes to display
            {:else}
            Error, Please contact support
            {/if}
        </div>
    {:else}
        <div class=" mx-2 absolute text-white bg-gradient-to-tr from-[#49243d] via-[#442b51] to-[#2c125c] flex flex-col px-10 pb-10 pt-4 rounded-lg">
            <div class="w-full text-center bg-clip-text text-transparent bg-gradient-to-r text-2xl font-semibold from-[#D283B8] via-[#995BBB] to-[#6738BE] mb-4">
                Your Pass{#if codeDataArr.length > 1}es{/if}
            </div>
            <div class=" bg-white px-4 pt-4 rounded-lg shadow-2xl">
                {#key currentData}
                    <QRCode codeValue = {currentData} squareSize = {300}/>
                {/key}
                <div class="w-full text-center bg-clip-text bg-gradient-to-t text-transparent from-[#49243d] via-[#442b51] to-[#2c125c] text-2xl font-extrabold  mt-2 mb-3 ">
                    {typeArr[cursor]}
                </div>

            </div>
            
            {#if codeDataArr.length > 1}
                <div class="w-full text-center bg-clip-text text-transparent bg-gradient-to-r text-2xl font-semibold from-[#D283B8] via-[#995BBB] to-[#6738BE] mt-4">
                    <button on:click={next} class=" w-fit px-4 rounded-lg h-full active:text-white bg-clip-border duration-200">next</button>
                </div>
            {/if}
            <div class=" w-full text-center pt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#c7acac] via-[#d6bfe2] to-[#7e7b83]">
                This QR grants event access.<br>Take a screenshot, <i>Just in case.</i>
            </div>
            
        </div>
    {/if}
</div>

