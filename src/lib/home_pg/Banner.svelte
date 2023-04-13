<script>
// @ts-nocheck
    import downarrow from "../../assets/down-arrow.svg"
	import { browser } from "$app/environment";
    import { onMount } from "svelte";

    const endTime = 1682652600000
    let dLeft = "-", hLeft = "-", mLeft = "-", sLeft = "-"
    let particles = 40
    let delay = 2
    
    let wave1, wave2, wave3, wave4;
    
    onMount(() => {
        window.scrollTo(0,0)
    
        setTimeout(()=>{
            document.getElementById("spin1").classList.remove("rotateinOnLoad1")
            document.getElementById("spin2").classList.remove("rotateinOnLoad2")
            document.getElementById("spin3").classList.remove("rotateinOnLoad3")
            document.getElementById("spin4").classList.remove("rotateinOnLoad4")
            document.getElementById("spin1").classList.add("slowRotateClockwise")
            document.getElementById("spin2").classList.add("slowRotateAntiClockwise")
            document.getElementById("spin3").classList.add("slowerRotateClockwise")
            document.getElementById("spin4").classList.add("slowerRotateAntiClockwise")
        
        
        
        },1500)

        var container = wave1
        for(let i=2;i<=particles;i++)
            container.innerHTML += `<div class='wavy s-CrrGW-6Buhux' style='--i:${i}'></div>`
        container = wave2
        for(let i=2;i<=particles;i++)
            container.innerHTML += `<div class='wavy s-CrrGW-6Buhux' style='--i:${i+1*delay}'></div>`
        container = wave3
        for(let i=2;i<=particles;i++)
            container.innerHTML += `<div class='wavy s-CrrGW-6Buhux' style='--i:${i+2*delay}'></div>`
        container = wave4
        for(let i=2;i<=particles;i++)
            container.innerHTML += `<div class='wavy s-CrrGW-6Buhux' style='--i:${i+3*delay}'></div>`



    })

    if(browser){
        
        setInterval( () => {
            let Ctime = new Date().getTime()


            //Get Days, Hours, Minutes, Seconds
            dLeft = Math.floor((endTime - Ctime) / 86400000)
            hLeft = Math.floor(((endTime - Ctime) - (dLeft*86400000)) / 3600000)
            mLeft = Math.floor(((endTime - Ctime) - (dLeft*86400000) - (hLeft*3600000)) / 60000) 
            sLeft = Math.floor(((endTime - Ctime) - (dLeft*86400000) - (hLeft*3600000) - (mLeft*60000)) / 1000)

            //Single digits are padded with a 0 to the left (XX:9 -> XX:09)
            hLeft = (hLeft < 10)? `0${hLeft}` : hLeft
            mLeft = (mLeft < 10)? `0${mLeft}` : mLeft
            sLeft = (sLeft < 10)? `0${sLeft}` : sLeft


        }, 1000)


        document.addEventListener("scroll", (event) => {
            document.getElementById('downarrow').className = " opacity-0 mb-20 transition-all duration-700"
        });
        
        
        
       


    }

</script>


<div id = "banner-inner-contain" class=" ">
    <div id="container" class=" h-screen w-screen bg-gradient-to-t to-[#2b1a25] via-[#130926] from-zinc-900 bg-opacity-0 flex justify-center items-center z-[7]">
        <div class="absolute mb-0 h-screen w-screen flex flex-col justify-center overflow-hidden">
            <div class="h-[30vw] flex flex-col justify-end fadeinLate">
                <div class="absolute waves mb-0 h-[0%] z-[6] w-screen flex flex-row justify-between items-center" id="wave" bind:this={wave1}>
                    <div class="wavy" style="--i: 1"/>
                </div>
                <div class="waves absolute mb-0 h-[0%] ml-2 w-screen flex flex-row justify-between items-center" id="wave2" bind:this={wave2}>
                    <div class="wavy" style="--i: {delay}"/>
                </div>
                <div class="absolute waves h-[0%] w-screen ml-4 flex flex-row justify-between items-center" id="wave3" bind:this={wave3}>
                    <div class="wavy" style="--i: {delay*2}"/>
                </div>
                <div class="waves absolute mb-0 h-[0%] ml-6 w-screen flex flex-row justify-between items-center" id="wave4" bind:this={wave4}>
                    <div class="wavy" style="--i: {delay*3}"/>
                </div>
            </div>
        </div>
        <div id = "banner-img-container " class="  ">
            <div class="align-middle">
                <svg width="815" height="280" viewBox="0 0 815 280" fill="none" class="fadeinonload max-w-[70%] mx-auto my-0"  xmlns="http://www.w3.org/2000/svg">
    <!--stice-->    <path d="M286.575 173.575H326.825V193H262.075V70.85H286.575V173.575ZM384.572 194.225C376.056 194.225 368.356 192.767 361.472 189.85C354.706 186.933 349.339 182.733 345.372 177.25C341.406 171.767 339.364 165.292 339.247 157.825H365.497C365.847 162.842 367.597 166.808 370.747 169.725C374.014 172.642 378.447 174.1 384.047 174.1C389.764 174.1 394.256 172.758 397.522 170.075C400.789 167.275 402.422 163.658 402.422 159.225C402.422 155.608 401.314 152.633 399.097 150.3C396.881 147.967 394.081 146.158 390.697 144.875C387.431 143.475 382.881 141.958 377.047 140.325C369.114 137.992 362.639 135.717 357.622 133.5C352.722 131.167 348.464 127.725 344.847 123.175C341.347 118.508 339.597 112.325 339.597 104.625C339.597 97.3917 341.406 91.0917 345.022 85.725C348.639 80.3583 353.714 76.275 360.247 73.475C366.781 70.5583 374.247 69.1 382.647 69.1C395.247 69.1 405.456 72.1917 413.272 78.375C421.206 84.4417 425.581 92.9583 426.397 103.925H399.447C399.214 99.725 397.406 96.2833 394.022 93.6C390.756 90.8 386.381 89.4 380.897 89.4C376.114 89.4 372.264 90.625 369.347 93.075C366.547 95.525 365.147 99.0833 365.147 103.75C365.147 107.017 366.197 109.758 368.297 111.975C370.514 114.075 373.197 115.825 376.347 117.225C379.614 118.508 384.164 120.025 389.997 121.775C397.931 124.108 404.406 126.442 409.422 128.775C414.439 131.108 418.756 134.608 422.372 139.275C425.989 143.942 427.797 150.067 427.797 157.65C427.797 164.183 426.106 170.25 422.722 175.85C419.339 181.45 414.381 185.942 407.847 189.325C401.314 192.592 393.556 194.225 384.572 194.225ZM532.163 70.85V90.625H499.613V193H475.113V90.625H442.563V70.85H532.163ZM574.539 70.85V193H550.039V70.85H574.539ZM592.795 131.75C592.795 119.733 595.478 109 600.845 99.55C606.328 89.9833 613.737 82.575 623.07 77.325C632.52 71.9583 643.078 69.275 654.745 69.275C668.395 69.275 680.353 72.775 690.62 79.775C700.887 86.775 708.062 96.4583 712.145 108.825H683.97C681.17 102.992 677.203 98.6167 672.07 95.7C667.053 92.7833 661.22 91.325 654.57 91.325C647.453 91.325 641.095 93.0167 635.495 96.4C630.012 99.6667 625.695 104.333 622.545 110.4C619.512 116.467 617.995 123.583 617.995 131.75C617.995 139.8 619.512 146.917 622.545 153.1C625.695 159.167 630.012 163.892 635.495 167.275C641.095 170.542 647.453 172.175 654.57 172.175C661.22 172.175 667.053 170.717 672.07 167.8C677.203 164.767 681.17 160.333 683.97 154.5H712.145C708.062 166.983 700.887 176.725 690.62 183.725C680.47 190.608 668.512 194.05 654.745 194.05C643.078 194.05 632.52 191.425 623.07 186.175C613.737 180.808 606.328 173.4 600.845 163.95C595.478 154.5 592.795 143.767 592.795 131.75ZM757.571 90.625V121.25H798.696V140.675H757.571V173.05H803.946V193H733.071V70.675H803.946V90.625H757.571Z" fill="white"/>
    <!--S-->        <path d="M54.25 194.225C45.7333 194.225 38.0333 192.767 31.15 189.85C24.3833 186.933 19.0167 182.733 15.05 177.25C11.0833 171.767 9.04167 165.292 8.925 157.825H35.175C35.525 162.842 37.275 166.808 40.425 169.725C43.6917 172.642 48.125 174.1 53.725 174.1C59.4417 174.1 63.9333 172.758 67.2 170.075C70.4667 167.275 72.1 163.658 72.1 159.225C72.1 155.608 70.9917 152.633 68.775 150.3C66.5583 147.967 63.7583 146.158 60.375 144.875C57.1083 143.475 52.5583 141.958 46.725 140.325C38.7917 137.992 32.3167 135.717 27.3 133.5C22.4 131.167 18.1417 127.725 14.525 123.175C11.025 118.508 9.275 112.325 9.275 104.625C9.275 97.3917 11.0833 91.0917 14.7 85.725C18.3167 80.3583 23.3917 76.275 29.925 73.475C36.4583 70.5583 43.925 69.1 52.325 69.1C64.925 69.1 75.1333 72.1917 82.95 78.375C90.8833 84.4417 95.2583 92.9583 96.075 103.925H69.125C68.8917 99.725 67.0833 96.2833 63.7 93.6C60.4333 90.8 56.0583 89.4 50.575 89.4C45.7917 89.4 41.9417 90.625 39.025 93.075C36.225 95.525 34.825 99.0833 34.825 103.75C34.825 107.017 35.875 109.758 37.975 111.975C40.1917 114.075 42.875 115.825 46.025 117.225C49.2917 118.508 53.8417 120.025 59.675 121.775C67.6083 124.108 74.0833 126.442 79.1 128.775C84.1167 131.108 88.4333 134.608 92.05 139.275C95.6667 143.942 97.475 150.067 97.475 157.65C97.475 164.183 95.7833 170.25 92.4 175.85C89.0167 181.45 84.0583 185.942 77.525 189.325C70.9917 192.592 63.2333 194.225 54.25 194.225Z" fill="white"/>
                    <path id="spin1" class = " rotateinOnLoad1" d="M224.532 72.822L185.437 54.5914C162.23 43.7699 134.644 53.8101 123.823 77.0169L105.592 116.113C94.7708 139.319 104.811 166.905 128.018 177.726L167.114 195.957C190.32 206.778 217.906 196.738 228.727 173.531L246.958 134.436C257.779 111.229 247.739 83.6435 224.532 72.822Z" stroke="#3BACC1" stroke-opacity="0.75" stroke-width="9"/>
                    <path id="spin2" class = " rotateinOnLoad2" d="M262.262 109.346L211.864 45.9868C199.258 30.1394 176.192 27.5114 160.345 40.117L96.9855 90.5152C81.138 103.121 78.51 126.187 91.1156 142.034L141.514 205.393C154.12 221.241 177.185 223.869 193.033 211.263L256.392 160.865C272.239 148.259 274.867 125.194 262.262 109.346Z" stroke="#AF6C99" stroke-opacity="0.75" stroke-width="9"/>
                    <path id="spin3" class = " rotateinOnLoad3" d="M269.316 125.474L226.638 48.4814C216.758 30.6565 194.298 24.2163 176.473 34.0968L99.4809 76.7743C81.656 86.6548 75.2158 109.114 85.0963 126.939L127.774 203.932C137.654 221.757 160.114 228.197 177.939 218.316L254.931 175.639C272.756 165.758 279.196 143.299 269.316 125.474Z" stroke="#143E86" stroke-opacity="0.75" stroke-width="9"/>
                    <path id="spin4" class = " rotateinOnLoad4" d="M247.567 75.252L176.165 37.2866C158.17 27.7187 135.826 34.5499 126.258 52.5445L88.2929 123.947C78.725 141.942 85.5562 164.285 103.551 173.853L174.953 211.819C192.948 221.387 215.292 214.555 224.86 196.561L262.825 125.158C272.393 107.164 265.562 84.8199 247.567 75.252Z" stroke="#6738BE" stroke-opacity="0.75" stroke-width="9"/>
    <!--tech-->     <path class = "" d="M733.24 21.12V24.08H725.64V49H722V24.08H714.36V21.12H733.24ZM741.361 24.08V33.4H751.521V36.4H741.361V46H752.721V49H737.721V21.08H752.721V24.08H741.361ZM756.868 35.04C756.868 32.32 757.482 29.88 758.708 27.72C759.935 25.5333 761.602 23.8267 763.708 22.6C765.842 21.3733 768.202 20.76 770.788 20.76C773.828 20.76 776.482 21.4933 778.748 22.96C781.015 24.4267 782.668 26.5067 783.708 29.2H779.348C778.575 27.52 777.455 26.2267 775.988 25.32C774.548 24.4133 772.815 23.96 770.788 23.96C768.842 23.96 767.095 24.4133 765.548 25.32C764.002 26.2267 762.788 27.52 761.908 29.2C761.028 30.8533 760.588 32.8 760.588 35.04C760.588 37.2533 761.028 39.2 761.908 40.88C762.788 42.5333 764.002 43.8133 765.548 44.72C767.095 45.6267 768.842 46.08 770.788 46.08C772.815 46.08 774.548 45.64 775.988 44.76C777.455 43.8533 778.575 42.56 779.348 40.88H783.708C782.668 43.5467 781.015 45.6133 778.748 47.08C776.482 48.52 773.828 49.24 770.788 49.24C768.202 49.24 765.842 48.64 763.708 47.44C761.602 46.2133 759.935 44.52 758.708 42.36C757.482 40.2 756.868 37.76 756.868 35.04ZM810.607 21.12V49H806.967V36.36H792.767V49H789.127V21.12H792.767V33.36H806.967V21.12H810.607Z" fill="white"/>
                </svg>

                <div id = "countdownbox" class=" z-9 text-center text-3xl font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-r via-[#c04d26] from-[#772f9e] to-[#623bac] backgroundpan countFadeIn ">
                    {dLeft}:{hLeft}:{mLeft}:{sLeft}
                </div>
            </div>
        </div>
        <div class="absolute w-screen bottom-0 h-[50px] flex items-center max-md:hidden">
            <div class=" mx-auto">
                <img id="downarrow" src = {downarrow} alt={downarrow} class=" fadeinLate transition-all duration-700 mb-20">
            </div>
            
            <div class="fadeThisOut"></div>
        </div>
    </div>
    
    
</div>

<style>
    .wavy{
        height: 2px;
        width: 2px;
        background-color: white;
        
        box-shadow: 0 0 3px rgb(255, 255, 255);
    }

    .waves div{
        animation: wave 5s infinite;
        animation-timing-function: ease-in-out;
        animation-delay: calc(var(--i)*100ms);
    }
   
    @keyframes wave{
        0%{
            transform: translateY(0vw);
        }
        50%{
            transform: translateY(-30vw);
        }
        100%{
            transform: translateY(0vw);
        }
    }

    .fadeinLate{
        animation-name: lateFadeIn;
        animation-duration: 5000ms;
        animation-iteration-count: 1;
        animation-fill-mode: forward;
    }
    

    @keyframes lateFadeIn{
            
            0%{
            opacity: 0;
            }

            80%{
            opacity: 0;   
            }

            100%{
            opacity: 100%;
            }


    }

    .fadeThisOut{
        animation-name: fadeOut;
        animation-timing-function: ease-out;
        animation-duration: 1000ms;
        animation-iteration-count: 1;
        animation-fill-mode: forward;
        transition: all;
    }

    @keyframes fadeOut{
        
        0%{
            opacity: 100%;
        }
        
        105%{
            opacity: 0;   
        }
     
    }

    .backgroundpan {
    background-size: 200%;
    animation: backgroundpanAnim 4000ms linear infinite;
}

@keyframes backgroundpanAnim{
    from{
        background-position: 0% center;
    }
    to{
        background-position: -200% center;
    }
}

.countFadeIn{
    animation-name: fadeInCount;
    animation-duration: 3000ms;
    animation-iteration-count: 1;
    animation-fill-mode: forward;
    animation-timing-function: ease-in-out;
    }

    @keyframes fadeInCount {
        0%{
        transform: translateY(-50px);
        opacity: 0;
    }

    50%{
        transform: translateY(-50px);
        opacity: 0;   
    }

    100%{
        transform: translateY(0px);
        opacity: 100%;
    }
    } 
</style>