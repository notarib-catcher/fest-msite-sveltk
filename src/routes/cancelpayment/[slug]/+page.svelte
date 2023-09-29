<script>
	import { browser } from '$app/environment';
	import BgAnim from '$lib/common/BGAnim.svelte';

    export let data

    if(browser){
        if(data.cancelled){
            setTimeout(()=>{
                window.location.replace("/book?cancelled") 
            }, 1000)
        }
    }
  
</script>


<div class=" bg-black h-screen w-screen z-[3000] ">
        <div class=" absolute backdrop-blur-md top-0 left-0 z-[100] w-screen h-screen text-3xl  flex items-center justify-center font-normal ">
            <div class=" w-screen text-center font-uni font-semibold text-white">
                Resetting payment status...
            </div>
        </div>
</div>