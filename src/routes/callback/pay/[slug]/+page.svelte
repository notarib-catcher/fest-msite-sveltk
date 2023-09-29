<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';  

    export let data

    if(browser)
        setTimeout(() => {
            window.location.replace(data.redirect)
        }, 2000)
</script>

<div class=" h-screen w-screen fixed z-[2000] bg-black top-0 left-0 ">


    <div class="  absolute backdrop-blur-md top-0 left-0 z-[100] w-screen h-screen text-3xl  flex items-center justify-center font-bold font-uni text-white ">
        <div class=" w-screen text-center">
            {data.res}
        </div>
    </div>

</div>