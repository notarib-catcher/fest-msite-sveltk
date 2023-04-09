<script>
// @ts-nocheck


    export let data;

    
</script>


<div class=" h-screen w-screen ">

    {#if data.payment}

        <div class="  absolute backdrop-blur-md top-0 left-0 z-[8] w-screen h-screen  flex items-center justify-center font-thin bg-clip-text text-transparent text-2xl bg-gradient-to-tr from-[#D283B8] via-[#995BBB] to-[#6738BE] ">
            <div class=" w-screen text-center">
                You already have a pending payment ({data.payment.ref_id})<br><a href={data.payment.short_url} class=" font-semibold ">Pay it</a> or <a href={"/cancelpayment/" + data.payment.ref_id} class=" font-semibold ">Cancel the payment</a>
            </div>
        </div>
    {/if}
</div>
