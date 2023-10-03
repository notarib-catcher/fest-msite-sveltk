<script>
	import { browser } from "$app/environment";
    import { navigating } from "$app/stores";
	import { onMount } from "svelte";

    const textTarget = "FALAK SURGE"
    let currentText = "           "
    const randomCharSpace = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"




    onMount(async () => {
        if(browser){
            while($navigating){
                
            }
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
                setInterval(() => {
                    bnrtxt.innerText = bnrtxt?.innerText.split("").map((letter, index) => {
                        if(index<iterations){
                            return bnrtxt.dataset.value[index]
                        }

                        return randomCharSpace[Math.floor(Math.random() * randomCharSpace.length)]
                    }).join("")
                    iterations += 1/3;
                }, 33);
            }, 100)
                
        }
    })
     
</script>
<div class=" h-fit bg-[#3300bd] -z-[2] relative">
    <div class="h-[100lvh] w-screen bg-opacity-100 ">
        <div class=" bannertop absolute top-0 left-0 w-screen h-[70vh] -z-[1]">  
        </div>
        <div class=" absolute w-full h-full top-0 left-0 flex items-center justify-center">
            <div id="flk-banner" data-value="FALAK SURGE" class=" whitespace-nowrap overflow-clip bannertext text-[14vw] font-monster bg-clip-text text-transparent bg-gradient-to-b from-[#FFE500] to-[#F9BAA8]">
            </div>
        </div>
        <div class=" bannerbtm absolute bottom-0 left-0 w-screen h-[60vh] z-[1]">
    
        </div>
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
        background-size: cover;
        background-repeat: repeat-x no-repeat;
        animation-name: movetreesup;
        animation-duration: 1000ms;
        animation-timing-function: ease-out;
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

    @keyframes movetreesup{
        0%{
            transform: translateY(50px);
        }
        100%{
            transform: translateY(0px);
        }
    }
</style>