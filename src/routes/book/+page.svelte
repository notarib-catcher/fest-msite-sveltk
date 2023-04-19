<script>
	import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import sign from 'jwt-encode'

    import logo from '../../assets/SolsticeFullLogo.svg'

    import { signIn } from '@auth/sveltekit/client';
	import Popup from '$lib/book_pg/Popup.svelte';

    let paymentclosed = true

    let popupFlagship = false
    let popupProshow = false
    let popupStandard = false
    let popupEsports = false

// @ts-nocheck
    export let data;

    

    if(browser){
        if(data.payment){
            document.body.style.overflowY = "hidden"
        }
    }



    const signURL = (type = "", refcode = "NA", phone = "0000000000", extradat = "") => {
        let payload = {
            type: type,
            refcode: (refcode.trim() == "")?"NA" : refcode.trim().toUpperCase(),
            extradat: extradat?.substring(0,100) || "",
            contact: "+91" + phone,
            iat: new Date().getTime()
        }

        // @ts-ignore
        return sign(payload, $page.data.session?.user?.email)
    }

    const book = (Bevent) => {
        let {detail: options} = Bevent
        if(!$page.data.session){
            signIn("google","/book?loginSuccess")
        }

        let {event, extradat, phnum, refcode, eventChosen} = options
        let type = ""
        if(eventChosen == "VALO" || eventChosen == "CODM" || eventChosen == "FIFA" ||  eventChosen == "CROYL"){
            type = "ESPORT_" + eventChosen
        }

        if(eventChosen == "THUNT" || eventChosen == "DESGN" || eventChosen == "HCKTH"){
            type = "FLAGSHIP"
            extradat += " " + eventChosen
        }

        if(event.toLowerCase().includes("proshow")){
            type = "PROSHOW"
        }

        if(event.toLowerCase().includes("standard")){
            type = "STANDARD"
        }

        if(type == "" ){
            return
        }

        let signed = signURL(type, refcode, phnum, extradat)
        window.location.replace(data.origin + "/pay/" + signed)
    }

    
</script>


<div class=" bg-[#1e1e1e] min-h-screen h-fit flex items-center justify-center">
    {#if data.payment}
        <div class="fixed backdrop-blur-md top-0 left-0 z-[8] w-screen h-screen  flex items-center justify-center font-normal fadeinSlow ">
            <div class=" bg-black p-4 rounded-2xl md:whitespace-nowrap">
                <div class=" max-w-fit max-md:text-sm text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r bg-clip-text text-transparent text-2xl">
                    You already have a pending payment ({data.payment.ref_id})<br><a href={data.payment.short_url} class=" font-semibold border-b-2 hover:border-b-4 duration-200 hover:font-bold active:text-white border-[#4b2c59] ">Pay it</a> or <a data-sveltekit-preload-data="tap" href={"/cancelpayment/" + data.payment.ref_id} class=" font-semibold border-b-2 active:text-white hover:border-b-4 hover:font-bold duration-200 border-[#4b2c59]">Cancel the payment</a>
                </div>
            </div>   
        </div>
    {/if}

    <div class="top-20 grid grid-flow-col max-lg:grid-flow-row w-fit mx-[200px] max-lg:mt-10 lg:gap-5 xl:gap-20 gap-y-9 ">
        <div class=" h-[300px] w-[250px] bgGradientCardGold rounded-3xl bg-opacity-30 flex flex-col-reverse items-center relative lg:hidden">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-[#ffffff] ">Proshow Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-5"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-16" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupProshow = true}}>
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    ₹450
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-6 text-[#ffffff]">
                Join the fun!
            </div>
            {#if popupProshow}
                <Popup title="Proshow Pass" innerText="hello" type="gold" on:close ={() => { popupProshow = false}} on:book={book}/>
            {/if}
        </div>
        <div class=" h-[300px] w-[250px] bgGradientCardBlue rounded-3xl bg-opacity-30 flex flex-col-reverse items-center relative">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-[#bcbbbb] ">Flagship Event Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-5"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-16" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupFlagship = true}}>
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    ₹200
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-6 text-[#bcbbbb]">
                Attend a Flagship Event
            </div>
            {#if popupFlagship}
            <Popup title="Flagship Event" innerText="hello" type="gold" on:close ={() => { popupFlagship = false}} on:book={book}/>
            {/if}
        </div>
        <div class=" h-[300px] w-[250px] bgGradientCardGold rounded-3xl bg-opacity-30 flex flex-col-reverse items-center relative max-lg:hidden">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-[#ffffff] ">Proshow Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-5"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-16" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupProshow = true}}>
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    ₹450
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-6 text-[#ffffff]">
                Enjoy the music!
            </div>
            {#if popupProshow}
            <Popup title="Proshow Pass" innerText="hello" type="gold" on:close ={() => { popupProshow = false}} on:book={book}/>
            {/if}
        </div>
        <!--card-->
        <div class=" h-[300px] w-[250px] bgGradientCardSilver rounded-3xl bg-opacity-30 flex flex-col-reverse items-center relative">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-[#bcbbbb] ">Standard Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-5"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-16" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupStandard = true}} >
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    ₹50
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-6 text-[#bcbbbb]">
                All mini & fun events
            </div>
            {#if popupStandard}
            <Popup title="Standard Pass" innerText="hello" type="gold" on:close ={() => { popupStandard = false}} on:book={book}/>
            {/if}
        </div>
        <!--endofcard-->
        <div class=" h-[300px] w-[250px] bgGradientCardRed rounded-3xl bg-opacity-30 flex flex-col-reverse items-center relative">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-[#bcbbbb] ">Esports Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-5"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-16" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupEsports = true}}>
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    BUY NOW
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-6 text-[#bcbbbb]">
                Compete in E-sports
            </div>
            {#if popupEsports}
            <Popup title="Esports" innerText="hello" type="gold" on:close ={() => { popupEsports = false}} on:book={book}/>
            {/if}
        </div>
        
        <!--endofallcards-->
        

    </div>
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

    .bgGradientCardBlue{
        background-image: linear-gradient(to top right, rgba(101, 201, 243, 0.5), rgba(67, 102, 186, 0.7) , rgba(141, 107, 205, 0.9))
    }
    .bgGradientCardGold{
        background-image: linear-gradient(to bottom left, rgba(255, 217, 0, 0.765), rgba(255, 187, 0, 0.678) , rgba(199, 92, 16, 0.927))
    }
    .bgGradientCardSilver{
        background-image: linear-gradient(to top right, rgba(150, 150, 150, 0.671), rgba(25, 40, 65, 0.516) , rgba(107, 108, 107, 0.781))
    }
    .bgGradientCardRed{
        background-image: linear-gradient(to top right, rgba(78, 78, 78, 0.671), rgba(50, 84, 142, 0.516) , rgba(230, 60, 60, 0.781))
    }


    li {
        text-align: left;
        padding-left: 20px;
    }

    .font-cstm{
        font-weight: 550;
    }

</style>
