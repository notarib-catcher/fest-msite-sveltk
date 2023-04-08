<script>
// @ts-nocheck

    /**
     * @type {Array<string>}
     */
    export let codeDataArr;
    import QRCode from "../../lib/common/QRJS.svelte"

    let cursor = 0;
    let currentData = codeDataArr[0];


    const next = () => {
        cursor = (cursor + 1)% codeDataArr.length
    }

    $: currentData = codeDataArr[cursor]
</script>

{#if codeDataArr.length == 0}
<div class=" flex items-center justify-center h-screen w-screen">
    <div>    No passes to display
    </div>
</div>
{:else}
<div class=" flex items-center justify-center h-screen w-screen">
<div class=" mx-2 px-2 absolute text-white">
    <button on:click={next}>next</button>
    {#key currentData}
        <QRCode codeValue = {currentData} squareSize = {300}/>
    {/key}
</div>
</div>
{/if}
