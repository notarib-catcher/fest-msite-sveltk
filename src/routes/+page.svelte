<script>
	import { browser } from "$app/environment";
    import { navigating } from "$app/stores";
	import { onMount } from "svelte";
    import downarrow from "../assets/down-arrow.svg"

    const textTarget = "FALAK SURGE"
    let currentText = "           "
    const randomCharSpace = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

    const falaktext = "Welcome to Falak, a vibrant cultural and sports fest that ignites the spirit of unity, creativity, and excellence."
    const delay = (time) => new Promise((resolve, reject) => setTimeout(resolve, time))



    let addedinterval = false
    onMount(async () => {
        if(browser){

            const Scroll = () => {
                const arrowcontain = document.getElementById("arrowcontain")
                arrowcontain.style.opacity = 0

                setTimeout(async () => {
                    arrowcontain.classList.add('hidden')
                }, 1000)

                let flksplit = (falaktext.split("")).reverse()
                const flktxt = document.getElementById("flktxt-hp")

                if(addedinterval){
                   return 
                }
                addedinterval = true
                console.log(flksplit)

                let interval = setInterval(() => {
                    let x = flksplit.pop()
                    if(!x){
                        clearInterval(interval)
                        return
                    }
                    flktxt.textContent += x 
                },)

            }

            setTimeout(async () => {
                const arrow = document.getElementById("scroll-arrow")
                arrow.classList.remove("arrow-fadein")
                arrow.classList.add("animate-bounce2")
            },3000)

            while($navigating){
                await delay(100)
            }

            document.removeEventListener("scroll", Scroll)
            document.removeEventListener("touchmove", Scroll)
            document.addEventListener("touchmove", Scroll, false);
            document.addEventListener("scroll", Scroll, false);


            const bnrtxt = document.getElementById("flk-banner")
            let iterations = 0

            for(let i=0; i<textTarget.length; i++){
                bnrtxt.innerText += randomCharSpace[Math.floor(Math.random() * randomCharSpace.length)]
            }
            // for(let i=0; i<textTarget.length; i++){
            //     currentText = ""
            //     for(let j=0; j < textTarget.length; j++){
            //         if(j<=i){
            //             currentText += textTarget[j]
            //         }
            //         else{
            //             currentText += randomCharSpace[Math.floor(Math.random() * randomCharSpace.length)]
            //         }
            //     }
            //     console.log(currentText)
            // }

            setTimeout(() => {
                let interval2 = setInterval(() => {
                    bnrtxt.innerText = bnrtxt?.innerText.split("").map((letter, index) => {
                        if(index<iterations){
                            return bnrtxt.dataset.value[index]
                        }

                        return randomCharSpace[Math.floor(Math.random() * randomCharSpace.length)]
                    }).join("")
                    iterations += 1/3;
                    if(iterations*3 > bnrtxt.dataset.value){
                        clearInterval(interval2)
                    }
                }, 33);
            }, 100)
                
        }
    })
     
</script>
<div class=" h-[120lvh] bg-[#3300bd] -z-[10] relative">
    <div class="h-[80lvh] w-screen bg-opacity-100 ">
        <div class=" bannertop absolute top-0 left-0 w-screen h-[80lvh] -z-[9]">  
        </div>
        <div class=" absolute w-full h-full top-0 left-0 flex items-center justify-center -z-[8] -translate-y-[20lvh]">
            <div id="flk-banner" data-value="FALAK SURGE" class=" whitespace-nowrap overflow-clip bannertext text-[13vw] font-monster bg-clip-text text-transparent bg-gradient-to-b from-[#FFE500] to-[#F9BAA8]">
            </div>
        </div>
        <div class=" bannerbtm absolute bottom-[20lvh] left-0 w-screen h-[70vh] -z-[7]">
    
        </div>
    </div>
    <div class="absolute h-[45lvh] w-screen h-screen  flex items-center justify-center">
        <div id="flktxt-hp" class=" w-[90vw] font-uni font-bold text-[#FFE500] lg:text-2xl text-xl text-center">
    
        </div>
    
    </div>
</div>



<div id="arrowcontain" class="transition-all duration-1000 fixed top-0 left-0 w-screen z-[50] h-[100svh] items-center justify-end flex flex-col">
    <img id="scroll-arrow" src={downarrow} class="arrow-fadein lg:w-[4vw] xl:w-[3vw] w-[50px] animate-bounce">
</div>
<div class="w-screen px-[5vw] text-6xl font-monster bg-[#3300bd] text-white">
    EVENTS
</div>

<div class="eventsbox grid lg:grid-rows-2 lg:grid-cols-2 grid-rows-4 grid-cols-1 w-screen h-fit p-[5vw] bg-[#3300bd] gap-[5vw]">
    <div class=" h-[42.5vw] w-[42.5vw] max-lg:w-[90vw] featuredecard">

    </div>
    <div class=" h-[42.5vw] w-[42.5vw] max-lg:w-[90vw] sportsecard">

    </div>
    <div class=" h-[42.5vw] w-[42.5vw] max-lg:w-[90vw] culturalecard">

    </div>
    <div class=" h-[42.5vw] w-[42.5vw] max-lg:w-[90vw] esportsecard">

    </div>

</div>

<style>
    .bannertop{
        background-image: url("/imgs/lghtnn.png");
        background-position: 0px -50px;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .bannerbtm{
        background-image: url("/imgs/trees.png");
        background-size: 100vw;
        background-repeat: repeat-x;
        background-position: bottom center;
        
    }
    .bannertext{
        animation-name: movetextdown;
        animation-duration: 1000ms;
        animation-timing-function: ease-out;
    }

    @keyframes movetextdown{
        0%{
            transform: translateY(-100px);
        }
        100%{
            transform: translateY(0px);
        }
    }



     .arrow-fadein{
        animation-name: fadeIn;
        animation-duration: 3s;
        animation-fill-mode: forwards;
    } 

    @media (min-width: 1024px) {
        .bannerbtm {
            background-size: 70vw;
        }
    }

    @media (min-width: 1024px) {
        .bannerbtm {
            background-size: 90vw;
        }
    }

    @media (min-width: 1200px) {
        .bannerbtm {
            background-size: 60vw;
        }
    }

    @media (min-width: 1500px) {
        .bannerbtm {
            background-size: 50vw;
        }
    }

    @media (max-width: 700px) {
        .bannerbtm {
            background-size: 120vw;
        }
    }

    @media (max-width: 600px) {
        .bannerbtm {
            background-size: 150vw;
        }
    }

    @media (max-width: 500px) {
        .bannerbtm {
            background-size: 200vw;
        }
    }


    /*
    .arrow-opacity-0{
        opacity: 0;
    } */

    @keyframes fadeIn{
        0%{
            opacity: 0;
        }
        70%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }

    @keyframes fadeOut{
        0%{
            opacity: 1;
        }
        100%{
            opacity: 2;
        }
    }
</style>