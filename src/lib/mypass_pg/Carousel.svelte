<script>
// @ts-nocheck

    /**
     * @type {Array<string> | null}
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
<div class=" flex items-center justify-center h-screen w-screen text-white">
    {#if !codeDataArr.length || codeDataArr.length == 0}
        <div>
            No passes to display
        </div>
    {:else}
        <div class=" mx-2 px-2 absolute text-white">
            <button on:click={next}>next</button>
                {#key currentData}
                    <QRCode codeValue = {currentData} squareSize = {300}/>
                {/key}
        </div>
    {/if}
</div>

