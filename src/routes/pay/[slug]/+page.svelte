<script>
	import { browser } from '$app/environment';
    export let data

    if(browser){
        // @ts-ignore
        setTimeout(()   =>{
            window.location.replace(data.link)

        }, 2000)
    }
</script>

<div class="absolute z-[100] h-screen w-screen bg-black flex items-center justify-center overflow-hidden top-0 left-0">
    <div class=" text-center text-3xl font-thin text-white">
        {#if data.rcodestatus == "i"}
            Invalid Referral Code, Redirecting...
        {/if}
        {#if data.rcodestatus == "n"}
            Redirecting... 
        {/if}
        {#if data.rcodestatus == "y"}
            Referral Code Applied! Redirecting...
        {/if}
    </div>
</div>

<style>
    
</style>