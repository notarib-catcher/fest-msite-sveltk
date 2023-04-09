<script>
	import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import sign from 'jwt-encode'

    import { signIn } from '@auth/sveltekit/client';

// @ts-nocheck
    export let data;
    if(browser){
        if(data.payment){
            document.body.style.overflowY = "hidden"
        }
    }
    

    const signURL = (type = "", refcode = "NA") => {
        let payload = {
            type: type,
            refcode: refcode,
            iat: new Date().getTime()
        }

        // @ts-ignore
        return sign(payload, $page.data.session?.user?.email)
    }

    const book = (type = "", refcode = "NA") => {
        if(!$page.data.session){
            signIn("google","/book?loginSuccess")
        }
        if(type == "" ){
            return
        }

        let signed = signURL(type, refcode)
        window.location.replace(data.origin + "/pay/" + signed)
    }

    
</script>


<div class=" bg-[#1e1e1e] min-h-screen h-fit flex items-center justify-center">
    {#if data.payment}
        <div class="fixed backdrop-blur-md top-0 left-0 z-[8] w-screen h-screen  flex items-center justify-center font-thin fadeinSlow ">
            <div class=" bg-black p-4 rounded-2xl md:whitespace-nowrap">
                <div class=" max-w-fit max-md:text-sm text-center from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-gradient-to-r bg-clip-text text-transparent text-2xl">
                    You already have a pending payment ({data.payment.ref_id})<br><a href={data.payment.short_url} class=" font-semibold border-b-2 hover:border-b-4 duration-200 hover:font-bold active:text-white border-[#4b2c59] ">Pay it</a> or <a href={"/cancelpayment/" + data.payment.ref_id} class=" font-semibold border-b-2 active:text-white hover:border-b-4 hover:font-bold duration-200 border-[#4b2c59]">Cancel the payment</a>
                </div>
            </div>   
        </div>
    {/if}

    <div class="top-20 grid grid-flow-col max-md:grid-flow-row w-fit mx-[200px] md:gap-9 lg:gap-44 xl:gap-80 gap-y-9 ">
        <div class=" max-md:mt-10  h-[300px] w-[200px] bgGradientCardBLue rounded-3xl bg-opacity-30 flex items-center justify-center">
            <div class=" opacity-100 text-white">
                hiiiiiii NERDS
            </div>
        </div>
        <div class=" h-[300px] w-[200px] bgGradientCardBLue rounded-3xl bg-opacity-30 flex items-center justify-center">
            <div class=" opacity-100 text-white">
                <button class=" border-2 p-4" on:click={() => { book('STANDARD')}}>
                    {#if !$page.data.session}
                    Sign in
                    {:else}
                    Book
                    {/if}
                </button> 
            </div>
        </div>
        <div class=" h-[300px] w-[200px] bgGradientCardBLue rounded-3xl bg-opacity-30 flex items-center justify-center">
            <div class=" opacity-100 text-white">
                hiiiiiii NERDS
            </div>
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

    .bgGradientCardBLue{
        background-image: linear-gradient(to top right, rgba(101, 201, 243, 0.5), rgba(67, 102, 186, 0.7) , rgba(141, 107, 205, 0.9))
    }

</style>
