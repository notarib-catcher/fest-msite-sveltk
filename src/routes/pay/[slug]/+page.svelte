<script>
	import { browser } from '$app/environment';
	import BgAnim from '$lib/common/BGAnim.svelte';

    export let data

    if(browser){
        // @ts-ignore
        setTimeout(()   =>{
            window.location.replace(data.link)

        }, 2000)
    }
</script>


<div class="absolute bg-black z-[2000] h-screen w-screen flex items-center justify-center overflow-hidden top-0 left-0">
    <div class=" text-center text-3xl font-semibold font-uni text-white">
        {#if data.rcodestatus == "i"}
            Invalid Referral Code, Redirecting...
        {/if}
        {#if data.rcodestatus == "n"}
            Redirecting... <br>
            Do not press forward, back or refresh.
        {/if}
        {#if data.rcodestatus == "y"}
            Referral Code Applied! Redirecting...<br>
            Do not press forward, back or refresh.
        {/if}
    </div>
</div>

<style>
    
</style>