<script>
	import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import sign from 'jwt-encode'

    import logo from '../../assets/SolsticeFullLogo.svg'

    import { signIn } from '@auth/sveltekit/client';
	import Popup from '$lib/book_pg/Popup.svelte';
	import BgAnim from '$lib/common/BGAnim.svelte';

    let popupFlagship = false
    let popupProshow = false
    let popupStandard = false
    let popupEsports = false

// @ts-nocheck
    export let data;

    const upgradeArr = {
        "ESPORTS":400,
        "FLAGSHIP":400,
        "PROSHOW":150,
    }

    let upgradeprice = "Unavailable"

    if(data.top_pass.type){
        if(data.top_pass.type != "FULL_ACCESS"){
            if(upgradeArr[data.top_pass.type]){
                upgradeprice = upgradeArr[data.top_pass.type]
            }
        }
    }
    

    if(browser){
        if(data.payment){
            document.body.style.overflowY = "hidden"
        }
    }



    const signURL = (type = "", refcode = "NA", phone = "0000000000") => {
        let payload = {
            type: type,
            refcode: (refcode.trim() == "")?"NA" : refcode.trim().toUpperCase(),
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

        let {phnum, refcode, type} = options

        if(type == "FLAGS"){
            type = "FLAGSHIP"
        }

        if(type == "AAP"){
            type = "FULL_ACCESS"
        }

        if(type == "ESPRT"){
            type = "ESPORTS"
        }

        // if(event.toLowerCase().includes("proshow")){
        //     type = "PROSHOW"
        // }

        // if(event.toLowerCase().includes("standard")){
        //     type = "STANDARD"
        // }

        // if(type == "" ){
        //     return
        // }

        let signed = signURL(type, refcode, phnum)
        window.location.replace(data.origin + "/pay/" + signed)
    }

    
</script>


<div class=" bg-transparent min-h-screen h-fit flex items-center justify-center relative">
    <BgAnim />
    {#if data.payment}
        <div class="fixed backdrop-blur-md top-0 left-0 z-[8] w-screen h-screen  flex items-center justify-center font-normal fadeinSlow ">
            <div class=" bg-black p-4 rounded-2xl md:whitespace-nowrap">
                <div class=" max-w-fit max-md:text-sm text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r bg-clip-text text-transparent text-2xl">
                    You already have a pending payment ({data.payment.ref_id})<br><a href={data.payment.short_url} class=" font-semibold border-b-2 hover:border-b-4 duration-200 hover:font-bold active:text-white border-[#4b2c59] ">Pay it</a> or <a data-sveltekit-preload-data="tap" href={"/cancelpayment/" + data.payment.ref_id} class=" font-semibold border-b-2 active:text-white hover:border-b-4 hover:font-bold duration-200 border-[#4b2c59]">Cancel the payment</a>
                </div>
            </div>   
        </div>
    {/if}

    {#if !data.top_pass.type}
    <div class="top-20 grid grid-flow-col max-lg:grid-flow-row max-lg:mb-5 w-fit mx-[200px] md:mt-20 lg:mt-0 max-lg:mt-10 lg:gap-20 xl:gap-36 gap-y-9 ">
        <!-- <div class=" h-[300px] w-[250px] bgGradientCardGold rounded-3xl bg-opacity-30 flex flex-col-reverse items-center relative lg:hidden">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-[#ffffff] ">Proshow Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupProshow = true}}>
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    ₹450
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-12 text-[#ffffff]">
                Join the fun!
            </div>
            {#if popupProshow}
                <Popup title="Proshow Pass" innerText="Proshow and All Fun/Mini events" type="gold" on:close ={() => { popupProshow = false}} on:book={book}/>
            {/if}
        </div> -->
        <div class=" h-[300px] w-[250px] bgGradientCardSilver rounded-3xl bg-opacity-30 border-[1px] border-white flex flex-col-reverse items-center relative">
            <div class="absolute top-0 w-full text-right p-4  text-md font-cstm text-[#bcbbbb] ">Flagship Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupFlagship = true}}>
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    ₹200
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-12 text-[#bcbbbb]">
                Attend a Flagship Event
            </div>
            {#if popupFlagship}
            <Popup title="Flagship Event" innerText="Access to all flagship and standard events" type="FLAGS" on:close ={() => { popupFlagship = false}} on:book={book}/>
            {/if}
        </div>
        <!-- <div class=" h-[300px] w-[250px] bgGradientCardGold rounded-3xl bg-opacity-30 flex flex-col-reverse items-center relative max-lg:hidden">
            <div class="absolute top-0 w-full text-center p-4  text-md font-cstm text-[#ffffff] ">Proshow + Standard Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupProshow = true}}>
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    ₹450
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-12 text-[#ffffff]">
                Enjoy the music!
            </div>
            {#if popupProshow}
            <Popup title="Proshow Pass" innerText="Proshow and All Fun/Mini events" type="gold" on:close ={() => { popupProshow = false}} on:book={book}/>
            {/if}
        </div> -->
        <!--card-->
        <div class=" h-[300px] w-[250px] bgGradientCardGold border-[1px] border-white rounded-3xl bg-opacity-30 flex flex-col-reverse items-center relative">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-white ">All Access Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupStandard = true}} >
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    ₹600
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-8 text-center text-[#ffffff]">
                Everything, Everywhere,<br>All at Once.
            </div>
            {#if popupStandard}
            <Popup title="All accesss pass" innerText="Full access to everything in TechSolstice" type="AAP" on:close ={() => { popupStandard = false}} on:book={book}/>
            {/if}
        </div>
        <!--endofcard-->
        
        <div>
            <div class=" h-[300px] w-[250px] bgGradientCardRed rounded-3xl bg-opacity-30 border-[1px] border-white flex flex-col-reverse items-center relative">
                <div class="absolute top-0 right-0 p-4  text-md font-cstm text-[#bcbbbb] ">Esports Pass</div>
                <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                    <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
                </div>
                <div class=" relative opacity-100 text-white ">
                    
                    <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupEsports = true}}>
                        {#if !$page.data.session}
                        SIGN IN
                        {:else}
                        ₹200
                        {/if}
                    </button> 
                </div>
                <div class=" absolute bottom-0 text-sm mb-12 text-[#bcbbbb]">
                    Compete in E-sports
                </div>
                {#if popupEsports}
                <Popup title="Esports" innerText="Compete in esports and access all standard events" type="ESPRT" on:close ={() => { popupEsports = false}} on:book={book}/>
                {/if}
            </div>
        </div>
        <!--endofallcards-->
        

    </div>
    {:else if data.top_pass.type != "FULL_ACCESS"}
    <div>
        <div class=" h-[300px] w-[250px] bgGradientCardGold rounded-3xl bg-opacity-30 border-[1px] border-white flex flex-col-reverse items-center relative">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-white ">All Access Upgrade</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupStandard = true}} >
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    {upgradeprice!="Unavailable"?"₹"+upgradeprice:upgradeprice}
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-3 text-center text-[#ffffff]">
                Everything, Everywhere,<br>All at Once.
            </div>
            {#if popupStandard && upgradeprice != "Unavailable"}
            <Popup title="All accesss pass" innerText="Full access to everything in TechSolstice" type={"UPGRADE:"+data.top_pass.type.toUpperCase()+"_TO_FULL_ACCESS"} on:close ={() => { popupStandard = false}} on:book={book}/>
            {/if}
        </div>
    </div>
    {:else}
    <div>
        <div class=" h-[300px] w-[250px] bgGradientCardGold rounded-3xl bg-opacity-30 border-[1px] border-white flex flex-col-reverse items-center relative">
            <div class="absolute top-0 right-0 p-4  text-md font-cstm text-white ">All Access Pass</div>
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <img src = {logo} alt="logo" width="170px" class=" mx-auto mb-24"> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 text-[#393a3b] font-bold capitalize duration-300 py-2 px-12 rounded-lg mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else window.location.replace('/mypass')}} >
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    Already Owned
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-3 text-center text-[#ffffff]">
                Everything, Everywhere,<br>All at Once.
            </div>
        </div>
    </div>
    {/if}

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
        background-image: linear-gradient(to bottom left, rgba(219, 196, 44, 0.6) ,rgba(209, 105, 31, 0.3));
    }
        
    .bgGradientCardSilver{
        background-image: linear-gradient(to top right, rgba(192, 192, 192, 0.434), rgba(44, 61, 89, 0.4),rgba(141, 145, 141, 0.4));
    }
    .bgGradientCardRed{
        background-image: linear-gradient(to top right, rgba(51, 51, 51, 0.671), rgba(50, 84, 142, 0.349) , rgba(230, 60, 60, 0.491));
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

    li {
        text-align: left;
        padding-left: 20px;
    }

    .font-cstm{
        font-weight: 550;
    }

</style>
