<script>
	import { browser } from '$app/environment';

    export let data

    if(browser){
        if(data.cancelled){
            setTimeout(()=>{
                window.location.replace("/book?cancelled") 
            }, 1000)
        }
    }
  
</script>

<div class=" h-screen w-screen ">


        <div class="  absolute backdrop-blur-md top-0 left-0 z-[100] w-screen h-screen text-3xl  flex items-center justify-center font-thin bg-clip-text text-transparent  bg-gradient-to-tr from-[#D283B8] via-[#995BBB] to-[#6738BE] ">
            <div class=" w-screen text-center">
                Cancelling...
            </div>
        </div>

</div>