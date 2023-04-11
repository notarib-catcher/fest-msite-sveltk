<script>
	import { createEventDispatcher } from "svelte";
    export let innerText;
    export let title;


    const dispatch = createEventDispatcher()
</script>


<div class="fixed  top-0 left-0 z-[11] w-screen max-xs:w-[600px] h-screen flex items-center justify-center font-thin fadeinSlow ">
    <div class=" bg-black p-4 rounded-2xl  max-md:font-semibold text-center max-md:text-3xl z-[9] max-w-[60%] max-md:max-w-[80%] max-md:my-[10%]">
        <div class=" w-full font-extrabold whitespace-nowrap max-md:text-sm  text-center mb-6 from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r max-md:bg-gradient-to-l bg-clip-text text-transparent text-4xl">
            {title}
        </div>
        <div class=" max-w-fit max-md:text-sm whitespace-normal justify-evenly text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r max-md:bg-gradient-to-l bg-clip-text text-transparent text-2xl">
            {innerText}
        </div>
        <div class="w-full text-center mt-4  font-semibold from-[#9c8494] via-[#d0b4e0] to-[#ada0c7] bg-gradient-to-r text-transparent bg-clip-text text-xs ">Press anywhere outside to dismiss</div>
    </div> 
    <button class="fixed backdrop-blur-md top-0 left-0 h-screen w-screen cursor-pointer fadeinSlow" on:click={() => {dispatch("msg",{ text: "close"})}}>

    </button>  
</div>


<style>
            .fadeinSlow{
        animation-name: slowFadeIn;
        animation-duration: 1000ms;
        animation-iteration-count: 1;
        animation-fill-mode: forward;
    }
    

    @keyframes slowFadeIn{
            
            0%{
            transform: translateY(-50px);
            opacity: 0;
            }

            100%{
            transform: translateY(0px);
            opacity: 100%;
            }


    }

    .bgGradientCardBLue{
        background-image: linear-gradient(to top right, rgba(101, 201, 243, 0.5), rgba(67, 102, 186, 0.7) , rgba(141, 107, 205, 0.9))
    }
</style>