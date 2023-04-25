<script>
	import { onMount } from 'svelte';
    import { browser } from '$app/environment'

    import Carousel from 'svelte-carousel';

    import CarouselElement from './CarouselElement.svelte'

    let carousel
    const handleClick = async () => {
        carousel.goToNext()
    }   

    export const ssr = false
    export const prerender = false
    let itemstoshow = 3
    


    if(browser){
       
    if(window.innerWidth > 768){
        // @ts-ignore
        if(window.innerWidth > 1000){
            itemstoshow = 3
        }
        else{
            itemstoshow = 2
        }
    }
    else{
        itemstoshow = 1
    }
        window.addEventListener('resize', async () => {
            if(window.innerWidth > 800){
        // @ts-ignore
        if(window.innerWidth > 1200){
            itemstoshow = 3
        }
        else{
            itemstoshow = 2
        }
    }
    else{
        itemstoshow = 1
    }
        })
    }
   

</script>

<div class=" w-screen overflow-hidden  flex flex-col justify-center items-center ">
    <div class="max-md:text-5xl w-full text-center text-6xl pointer-events-none mt-20 px-3 max-md:text-center font-bold bg-gradient-to-tr  from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent bg-clip-text">
        Meet the team
    </div>
    <div class=" mt-10 w-screen pt-5  ">
        {#if browser}
            <Carousel
            autoplayDuration={2000}
            duration={1000}
            timingFunction="ease"
            autoplay
            particlesToShow={itemstoshow}
            particlesToScroll={1}
            arrows={false}
            swiping={false}
            pauseOnFocus>
                <CarouselElement />
                <CarouselElement />
                <CarouselElement />
                <CarouselElement />
                <CarouselElement />
                <CarouselElement />
                </Carousel>

           {/if}
    </div>

    
</div>

<style>

    .osdiv{
        -ms-overflow-style: none; /* for Internet Explorer, Edge */
        scrollbar-width: none; /* for Firefox */
        overflow-x: scroll; 
        overflow-y: hidden;
        font-family:  'Poppins', sans-serif;
    }

    .osdiv::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    }

    
</style>