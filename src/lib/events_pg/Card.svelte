<script>
// @ts-nocheck

	import { browser } from "$app/environment";
	import { onMount } from "svelte";
    import Popup from "./Popup.svelte";


    export let briefdescription;
    export let fulldescription;
    export let title;
    export let type;

 
    let showChild = false

    const onClick = () => {
        showChild = true
    }



 

</script>

<div class=" rounded-xl relative border-yellow-800 border-2 w-[300px] h-[400px]">
    <button class="absolute h-full w-full " on:click={onClick}><div class=" absolute h-full w-full top-0"></div></button>
    <div class=" w-full text-center mt-2 font-extrabold text-xl text-white border-b-2 border-yellow-800 pb-2">
        {title}
    </div>
    <div class=" w-full justify-between bg-gradient-to-tr from-[#D283B8] to-[#D283B8] via-[#6738BE] bg-clip-text text-transparent p-4">
        {briefdescription}
    </div>
    {#if showChild}
    <Popup innerText={fulldescription} title={title} show = {showChild} on:msg={() => {showChild = false}} />
    {/if}
</div>