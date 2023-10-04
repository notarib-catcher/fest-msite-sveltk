<script>
	import { browser } from "$app/environment";
    import { navigating } from "$app/stores";
	import { onMount } from "svelte";
    import downarrow from "../assets/down-arrow.svg"
    import mitlogo from "../assets/sponsors/manipal-logo.png"
    import SURGELOGO from "../assets/FALAKLOGO.svg"

    const textTarget = "FALAK SURGE"
    let currentText = "           "
    const randomCharSpace = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

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

                if(flktxt.textContent){
                    return
                }

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
            <div id="flk-banner" data-value="FALAK SURGE" class=" whitespace-nowrap overflow-clip bannertext text-[10vw] font-csc bg-clip-text text-transparent bg-gradient-to-b from-[#FFE500] to-[#F9BAA8]">
            </div>
        </div>
        <div class=" bannerbtm absolute bottom-[20lvh] left-0 w-screen h-[70vh] -z-[7]">
    
        </div>
    </div>
    <div class="absolute h-[45lvh] translate-y-[50px] w-screen  flex items-center justify-center">
        <div id="flktxt-hp" class=" w-[90vw] font-csc font-bold text-[#FFE500] text-xl lg:text-2xl xl:text-3xl text-center">
    <!-- TEXT IN HERE -->
        </div>
    
    </div>
</div>

<div class="w-screen bg-[#3300bd] hue-rotate flex items-center justify-center text-center flex-col mb-20">
    <span class="text-white font-uni">Organised by</span>
    <img src={mitlogo} class=" w-[500px] " style=" filter: brightness(0) invert(1);">
</div>


<div id="arrowcontain" class="transition-all duration-1000 fixed top-0 left-0 w-screen z-[50] h-[100svh] items-center justify-end flex flex-col">
    <img id="scroll-arrow" src={downarrow} class="arrow-fadein lg:w-[4vw] xl:w-[3vw] w-[50px] animate-bounce">
</div>
<div class="w-screen px-[5vw] text-6xl font-monster pt-10 bg-[#3300bd] text-white text-center">
    ABOUT US
</div>

<div class=" w-screen px-[5vw] text-center bg-[#3300bd] text-[#FFE500] font-csc select-none pt-10 font-bold text-lg lg:text-xl xl:text-2xl">
    Our journey began with a vision to bridge the gap between culture and sports. Falak is not just an event; it's an annual celebration that unites people from all walks of life.
    <br><br>
    With captivating cultural performances that showcase the beauty of tradition, adrenaline-pumping sports competitions, and thought-provoking debates, Falak is a melting pot of talents and ideas.
</div>

<div class="w-screen px-[5vw] text-6xl font-monster pt-10 bg-[#3300bd] text-white text-center mb-10">
    EVENTS
</div>


<div class="eventsbox grid lg:grid-cols-2 lg:grid-rows-2 grid-rows-4 grid-cols-1 items-center justify-center mx-auto w-fit gap-10">
    <div class="w-[350px] h-[550px] mx-auto  featuredecard bkdfe">
        <span class=" w-full absolute top-0 left-0 pt-5 pl-5 text-white text-3xl font-monster">
            Featured Events
        </span>
        <span class="max-w-[80%] p-5 inline-block mt-14 text-xl font-poppins font-bold text-white">
            The Heartbeat of the Fest. Explore a captivating array of events showcase the essence of our fest. From high-energy dance performances to pulse-pounding musical exchanges, our featured events promise unforgettable moments of inspiration and entertainment.
        </span>
        <button class="transition-all duration-200 btnbkd -translate-x-[5px] -translate-y-[5px] absolute bottom-5 left-5 bg-white text-black font-uni font-bold p-2" on:click={() => {window.location = "/events"}}>
            Join the party
        </button>
    </div>
    <div class="w-[350px] h-[550px] mx-auto sportsecard bkdsp">
        <span class="transition-all duration-200 w-full absolute top-0 left-0 pt-5 pl-5 text-white text-3xl font-monster">
            Sports Events
        </span>
        <span class=" max-w-[80%] p-5 inline-block mt-14 text-xl font-poppins font-bold text-white">
            Sports take centre stage in our celebration of culture, creativity, and excellence. Our sports events are designed to ignite your competitive fire, offering a thrilling platform to showcase your athleticism and sportsmanship. 
        </span>
        <button class="transition-all duration-200 btnbkd -translate-x-[5px] -translate-y-[5px] absolute bottom-5 left-5 bg-white text-black font-uni font-bold p-2" on:click={() => {window.location = "/events?scrollto=se"}}>
            on your marks...
        </button>
    </div>
    <div class="w-[350px] h-[550px] mx-auto culturalecard bkdce">
        <span class=" w-full absolute top-0 left-0 pt-5 pl-5 text-white text-3xl font-monster">
            Cultural Events
        </span>
        <span class=" max-w-[80%] p-5 inline-block mt-14 text-xl font-poppins font-bold text-white">
            Culture is the heartbeat of our festival, showcasing the richness of our diverse heritage through enchanting dances, gripping dramas, and soul-stirring music. We also fuel the spirit of competition with debates, painting contests, and quizzes. 
        </span>
        <button class="transition-all duration-200 btnbkd -translate-x-[5px] -translate-y-[5px] absolute bottom-5 left-5 bg-white text-black font-uni font-bold p-2" on:click={() => {window.location = "/events?scrollto=ce"}}>
            Get on the stage
        </button>

    </div>
    <div class="w-[350px] h-[550px] mx-auto esportsecard bkdes">
        <span class=" w-full absolute top-0 left-0 pt-5 pl-5 text-white text-3xl font-monster">
            Esports Events
        </span>
        <span class=" max-w-[80%] p-5 inline-block mt-14 text-xl font-poppins font-bold text-white">
            Gaming is a culture. Dive into the exhilarating world of esports tournaments, where the digital arena meets the richness of cultural diversity. Join us for a thrilling gaming experience like no other, as we bridge the gap between tradition and technology.
        </span>
        <button class="transition-all duration-200 btnbkd -translate-x-[5px] -translate-y-[5px] absolute bottom-5 left-5 bg-white text-black font-uni font-bold p-2" on:click={() => {window.location = "/events?scrollto=ee"}}>
            Begin matchmaking
        </button>
    </div>
</div>
<div class="w-screen px-[5vw] text-6xl font-monster pt-10 bg-[#3300bd] text-white text-center">
    FAQ
</div>
<section class="accordion w-[90vw] px-[5vw] mx-auto border-white ">
    
    <div class="tab">
        <input type="checkbox" name="accordion-0" id="cb0">
        <label for="cb0" class="tab__label font-uni font-bold border-b-2 mt-1">I can't seem to login with google</label>
        <div class="tab__content">
          <p class="border-b-2 text-white"> 
              If you get a <code>"disallowed_useragent"</code> error when logging in, it means that google accounts aren't supported by the browser you are using. Please use a different browser, such as chrome.
              <br>
              <br>
              This issue is usually caused by using the built in browser provided by some apps (Ex. Instagram)
          </p>
          
        </div>
      </div>
    <!-- starttab -->
    <div class="tab">
        <input type="checkbox" name="accordion-6" id="cb6">
        <label for="cb6" class="tab__label font-uni font-bold border-b-2 mt-1">Where do I buy a pass for a featured event?</label>
        <div class="tab__content">
          <p class="border-b-2 text-white "> 
            Passes for featured events are clubbed under "Cultural" tab on bookings page.   
          </p>
          
        </div>
      </div>
    <div class="tab">
      <input type="checkbox" name="accordion-1" id="cb1">
      <label for="cb1" class="tab__label font-uni font-bold border-b-2 mt-1">How do I know if an event is a team event?</label>
      <div class="tab__content">
        <p class="border-b-2 text-white"> 
            First, make sure you are logged in.
            <br><br>
            Then, head to the events page, press "More info" on the event you want to compete in.
            <br>
            <br>
            If you see the option to join/create a team, then the event is a team event that you can participate in with friends!
            <br>
            If you do not see the option to join a team or see the text "Registration needs pass", then that event is for solo participants only. 
        </p>
      </div>
    </div>
    <div class="tab">
        <input type="checkbox" name="accordion-5" id="cb5">
        <label for="cb5" class="tab__label font-uni font-bold border-b-2 mt-1">I wanna participate in a team event, as a solo participant</label>
        <div class="tab__content">
          <p class="border-b-2 text-white"> 
              Some team events have a minimum team size, others do not.<br>
              Consult the event's rulebook and check for a minimum team size, member count, or similar rule.<br>
              If you still have doubts, or if it isn't mentioned, you can text the event's organisers for help.<br>
              Their contact will be available at the end of every event's rulebook.
              <br>
              <br>
              Passes are non-refundable and we urge you to read all associated information before buying a pass or registering for an event.
          </p>
        </div>
      </div>
    <!-- endtab -->
    <div class="tab">
        <input type="checkbox" name="accordion-2" id="cb2">
        <label for="cb2" class="tab__label font-uni font-bold border-b-2 mt-1">How do I register for solo events?</label>
        <div class="tab__content">
          <p class="border-b-2 text-white "> 
              To register for a solo-participation event, you need to buy a pass.
              <br>
              <br>
              Once you buy a pass, head to the events page. 
              There, press "More info" for the event and click on the highlighted button to register.
              
          </p>
          
        </div>
      </div>
      <div class="tab">
        <input type="checkbox" name="accordion-3" id="cb3">
        <label for="cb3" class="tab__label font-uni font-bold border-b-2 mt-1">How do I register for team events?</label>
        <div class="tab__content">
          <p class="border-b-2 text-white "> 
              To register for team events, you need to buy a pass to make a team<br>
              You do not need to buy a pass if you are joining someone else's team for a sports or featured event.<br>
              You need to buy a pass to join someone's team for cultural events.
              <br>
              <br>
              To create your own team (as captain), first, buy a pass.<br>
              Then, head to the events page, press "More info" on the event you want to compete in.<br>
              There, pass owners will see the option to create their team.<br>
              <br>
              <br>
              You can join a team by asking for the team captain to give you invite link. <br>
              Simply clicking on the link will add you to the team, no effort needed!
              <br>
              <br>
              You can join a team or (as captain) manage your team members and invite new members at the competition portal <a class="font-bold underline" href="https://compete.mitblrfest.in">(link)</a>
              <br>
              <br>
              You can only form teams with people from the same institute as you.
              Your university ID cards will be checked on event day to verify this fact.
          </p>
          
        </div>
      </div>
  </section>
<div class="w-screen px-[5vw] text-6xl font-monster pt-10 bg-[#3300bd] text-white text-center">
    FIND US
</div>
<div class=" w-screen px-[15vw] max-sm:px-[5vw]">
    <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4613.399303500147!2d77.58746683406315!3d13.125627330237217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae196682f2da33%3A0x358deab93bcf0b1f!2sMAHE-BLR!5e0!3m2!1sen!2sin!4v1682232657039!5m2!1sen!2sin" class=" mt-5 max-sm:w-[90vw] w-[70vw] h-[90vh] max-md:h-[50vh] rounded-lg overflow-hidden mb-20" style="filter: invert(1) hue-rotate(180deg)" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>

<div class=" h-[200px] w-screen max-md:bg-[#04022A] flex flex-col items-center justify-center md:mb-20">
    <div class=" h-full p-5 bg-[#04022A] rounded-lg flex items-center justify-center flex-col ">
        <img src={SURGELOGO} class="max-h-[30%]">
        <span class="text-white font-csc mt-5">©2023 The Falak Team</span>
    </div>
    
</div>


<style>

    .btnbkd{
        filter: drop-shadow(10px 10px #04022A);
    }

    .btnbkd:hover {
        scale: 1.05;
    }

    .btnbkd:active {
        scale: 0.95;
    }

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
            background-size: 90vw;
        }
    }

    @media (max-width: 700px) {
        .bannerbtm {
            background-size: 200vw;
        }
    }

    @media (max-width: 600px) {
        .bannerbtm {
            background-size: 230vw;
        }
    }

    @media (max-width: 500px) {
        .bannerbtm {
            background-size: 270vw;
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

    .bkdsp{
        transform: translate(-5px -5px);
        filter: drop-shadow(10px 10px #004F47);
    }

    .bkdes{
        transform: translate(-5px -5px);
        filter: drop-shadow(10px 10px #450029);
    }

    .bkdfe{
        transform: translate(-5px -5px);
        filter: drop-shadow(10px 10px #761A00);
    }

    .bkdce{
        transform: translate(-5px -5px);
        filter: drop-shadow(10px 10px #053358);
    }

    /* Core styles/functionality for FAQ */
.tab input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.tab__content {
  max-height: 0;
  overflow: hidden;
  transition: all 0.35s;
}
.tab input:checked ~ .tab__content {
  max-height: 100rem;
}

/* Visual styles */
.accordion {
  color: var(--theme);
  border: 0;
  border-radius: 0.5rem;
  overflow: hidden;
}
.tab__label,
.tab__close {
  display: flex;
  color: white;
  background: var(--theme);
  cursor: pointer;
}
.tab__label {
  transform: translateY(-9px);
  justify-content: space-between;
  padding: 1rem;
}
.tab__label::after {
  content: "\276F";
  width: 1em;
  height: 1em;
  text-align: center;
  transform: rotate(90deg) translateY(-8px);
  transition: all 0.35s;
}
.tab input:checked + .tab__label::after {
  transform: rotate(270deg);
}
.tab__content p {
  margin: 0;
  padding: 1rem;
}
.tab__close {
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}
.accordion--radio {
  --theme: var(--secondary);
}

/* Small animation */
/* .tab input:not(:checked) + .tab__label:hover::after {
  animation: bounce .5s infinite;
}
@keyframes bounce {
  25% {
    transform: rotate(90deg) translate(.25rem);
  }
  75% {
    transform: rotate(90deg) translate(-.25rem);
  }
} */
</style>