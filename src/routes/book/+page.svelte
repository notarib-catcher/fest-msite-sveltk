<script>
	import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import sign from 'jwt-encode'

    import logo from '../../assets/falaksurgemd.png'

    import { signIn } from '@auth/sveltekit/client';
	import Popup from '$lib/book_pg/Popup.svelte';
	import BgAnim from '$lib/common/BGAnim.svelte';

    let popupSport = false
    let popupCultural = false
    let popupEsports = false

// @ts-nocheck
    // data contains the returned object from page.server.js
    // skeleton of object -> {top_pass: , payment: , origin: process.env.ORIGIN}
    export let data;


    let upgradeprice = "Unavailable"

    // logic to show the upgrade price if the pass is not of the type FULL_ACCESS
    // should also include a check for staff type pass
    
    

    /* what is the use of this check ? */
    // could possibly be to hide all the passes on the page
    if(browser){
        if(data.payment){
            document.body.style.overflowY = "hidden"
        }
    }

    // default values are provided to all parameters in this function
    const signURL = (type = "", refcode = "NA", phone = "0000000000") => {
        let payload = {
            type: type,
            refcode: "NA",
            contact: "+91" + phone,
            iat: new Date().getTime()
        }

        // @ts-ignore
        return sign(payload, $page.data.session?.user?.email)
    }

    const book = (Bevent) => {
        // whenever a booking event is fired an object is passed to this function
        let {detail: options} = Bevent
        if(!$page.data.session){
            signIn("google","/book?loginSuccess")
        }
        // the skeleton of the object is as below
        let {phnum, refcode, type} = options

        
        let signed = signURL(type, refcode, phnum)
        // then the user is redirected to the payment page
        window.location.replace(data.origin + "/pay/" + signed)
    }

    
</script>
<div class=" bg-transparent min-h-screen h-fit flex items-center justify-center relative gap-5 md:flex-row flex-col">
    <BgAnim />
    {#if data.payment}
        <div class="fixed backdrop-blur-md top-0 left-0 z-[8] w-screen h-screen  flex items-center justify-center font-normal fadeinSlow ">
            <div class=" bg-black p-4 rounded-2xl md:whitespace-nowrap">
                <div class=" max-w-fit max-lg:max-w-screen-md max-md:text-sm text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r bg-clip-text text-transparent text-2xl">
                    You already have a pending payment ({data.payment.ref_id})<br><a href={data.payment.short_url} class=" font-semibold border-b-2 hover:border-b-4 duration-200 hover:font-bold active:text-white border-[#4b2c59] ">Pay it</a> or <a data-sveltekit-preload-data="tap" href={"/cancelpayment/" + data.payment.ref_id} class=" font-semibold border-b-2 active:text-white hover:border-b-4 hover:font-bold duration-200 border-[#4b2c59]">Cancel the payment</a>
                    <br><div class=" mt-5">Already paid? <form method="POST"><input type="text" name="ref_id" value={data.payment.ref_id} hidden><button class="underline border-2 rounded-md p-2 border-[#4b2c59] mt-2 hover:scale-105 active:scale-95 transition-all duration-200">Refresh status</button></form></div>
                </div>
            </div>   
        </div>
    {/if}
    <div>
        <div class=" h-[300px] w-[250px] bgGradientCardGold rounded-3xl bg-opacity-30 border-[1px] border-white flex flex-col-reverse items-center relative">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-white ">Sports</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupSport = true}} >
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    Book now
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-3 text-center text-[#ffffff]">
                Everything, Everywhere,<br>All at Once.
            </div>
            {#if popupSport}
            <Popup title="All accesss pass" innerText="Full access to everything in TechSolstice" category="SPORTS" on:close ={() => { popupSport = false}} on:book={book}/>
            {/if}
        </div>
    </div>

    <div>
        <div class=" h-[300px] w-[250px] bgGradientCardGold rounded-3xl bg-opacity-30 border-[1px] border-white flex flex-col-reverse items-center relative">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-white ">Cultural</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupCultural = true}} >
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    Book now
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-3 text-center text-[#ffffff]">
                Everything, Everywhere,<br>All at Once.
            </div>
            {#if popupCultural}
            <Popup title="All accesss pass" innerText="Full access to everything in TechSolstice" category="CULTURAL" on:close ={() => { popupCultural = false}} on:book={book}/>
            {/if}
        </div>
    </div>

    <div>
        <div class=" h-[300px] w-[250px] bgGradientCardGold rounded-3xl bg-opacity-30 border-[1px] border-white flex flex-col-reverse items-center relative">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-white ">Cultural</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupEsports = true}} >
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    Book now
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-3 text-center text-[#ffffff]">
                Everything, Everywhere,<br>All at Once.
            </div>
            {#if popupCultural}
            <Popup title="All accesss pass" innerText="Full access to everything in TechSolstice" category="ESPORTS" on:close ={() => { popupEsports = false}} on:book={book}/>
            {/if}
        </div>
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

    .bgGradientCardGold{
        background-image: linear-gradient(to bottom left, rgba(219, 196, 44, 0.461),rgba(219, 196, 44, 0.726),rgba(209, 105, 31, 0.475));
        transition-duration: 200ms;
        transition-property: all;
    }
        
    .bgGradientCardSilver{
        background-image: linear-gradient(to top right, rgba(192, 192, 192, 0.436), rgba(44, 61, 89, 0.4), rgba(141, 145, 141, 0.445));
        transition-duration: 200ms;
        transition-property: all;
    }
    .bgGradientCardRed{
        background-image: linear-gradient(to top right, rgba(51, 51, 51, 0.47), rgba(50, 84, 142, 0.525), rgba(230, 60, 60, 0.571));
        transition-duration: 200ms;
        transition-property: all;
    }

    .bgGradientCardBlueAccent{
        background-image: linear-gradient(to top right, rgba(141, 107, 205, 0.3), rgba(67, 102, 186, 0.59), rgba(98, 200, 243, 0.8));
        transition-duration: 200ms;
        transition-property: all;
    }

    .bgGradientCardBlueAccent:hover{
        box-shadow: 0px 0px 30px #fffFFF33;

    }

    .bgGradientCardRed:hover{
        box-shadow: 0px 0px 30px #fffFFF33;

    }
    .bgGradientCardSilver:hover{
        box-shadow: 0px 0px 30px #fffFFF33;
    }
    .bgGradientCardGold:hover{
        box-shadow: 0px 0px 30px #fffFFF33;
    }

    .bgGradientCardBlueAccent:focus{
        box-shadow: 0px 0px 30px #fffFFF33;

    }

    .bgGradientCardRed:focus{
        box-shadow: 0px 0px 30px #fffFFF33;

    }
    .bgGradientCardSilver:focus{
        box-shadow: 0px 0px 30px #fffFFF33;
    }
    .bgGradientCardGold:focus{
        box-shadow: 0px 0px 30px #fffFFF33;
    }
    .bgGradientCardBlueAccent:focus-within{
        box-shadow: 0px 0px 30px #fffFFF33;

    }

    .bgGradientCardRed:focus-within{
        box-shadow: 0px 0px 30px #fffFFF33;

    }
    .bgGradientCardSilver:focus-within{
        box-shadow: 0px 0px 30px #fffFFF33;
    }
    .bgGradientCardGold:focus-within{
        box-shadow: 0px 0px 30px #fffFFF33;
    }

    li {
        text-align: left;
        padding-left: 20px;
    }

    .font-cstm{
        font-weight: 550;
    }

</style>
