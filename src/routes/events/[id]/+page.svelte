<script>
  import { signIn } from "@auth/sveltekit/client";

  import BgAnim from "$lib/common/BGAnim.svelte";
import MarkdownBox from "$lib/common/MarkdownBox.svelte";

  export let data;
  let RegText = "";
  let RegDisable = false;
  let RegSignIn = false;

  let allowedpasses = []

  allowedpasses.push("FULL_ACCESS")
  allowedpasses.push("STAFF")
  if(data.event.pass == "Standard"){
    allowedpasses.push("PROSHOW")
    allowedpasses.push("FLAGSHIP")
    allowedpasses.push("ESPORTS")
  }

  if(data.event.pass == "flagship"){
    allowedpasses.push("FLAGSHIP")
  }

  if(data.event.pass == "Proshow"){
    allowedpasses.push("PROSHOW")
  }

  
  if(data.event.pass.toLowerCase() == "esports"){
    allowedpasses.push("ESPORTS")
  }

  if(data.event.pass == "Free"){
    allowedpasses.push("ANYPASS")
  }

  if(data.event.ownedpasstype == "nosign"){
    RegText = "Sign in to register"
    RegSignIn = true
  }

  //actual pass check logic
  
  if(data.event.ownedpasstype == "nopass"){
    if(data.event.pass != "Free"){

      RegText = "This event needs " + (data.event.pass.toLowerCase() == "standard"?"a pass":"a "+ data.event.pass.toLowerCase()+ " pass") 
      RegDisable = true
    }
    else{
      RegText = "Register now!"
      RegDisable = false
    }
  }

  else{
    if(allowedpasses.includes(data.event.ownedpasstype) || allowedpasses.includes("ANYPASS")){
      RegText = "Register now!"
      RegDisable = false
    }
    else{
      RegText = "Please upgrade your pass"
      RegDisable = true
    }
  }


</script>
<BgAnim/>
<div
    class=" mt-20 max-lg:mt-16 pb-5 text-center w-full font-poppins bg-gradient-to-tr font-bold {
          data.event.pass == "flagship"?"from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1]"
          : data.event.pass === 'Standard'
          ? 'from-[#6212a4] via-[#2D6DB1] to-[#6212a4]'
          : data.event.pass == 'Proshow'
          ? 'from-[#723884] via-[#e5d016] to-[#880cae]'
          :  data.event.pass == 'esports'
          ? 'from-[#880cae] via-[#9c434b] to-[#880cae]'
          : data.event.pass == 'Free'
          ? 'from-[#26bf87] via-[#17d337] to-[#26bf87]'
          : 'border-[#0e5f0e9b] hover:bg-[#0e5f0e9b]'} bg-clip-text text-transparent text-3xl lg:text-[6vh]"
  >
    {data.event?.name}
  </div>
<div class=" flex lg:flex-row flex-col items-center justify-center  w-screen lg:pl-10   ">
  <div class=" self-start mt-10 w-full ">
    <div class="relative max-lg:w-[80%] max-lg:max-h-screen  mx-auto flex flex-col first:items-start ">
      <img
        src={data.event?.image}
        alt={data.event?.name}
        class=" top-0 w-full  rounded-lg shadow-xl shadow-black h-auto mb-[5vh]"
      />
      <div class="w-full flex justify-center">

      {#if RegSignIn}
        <button
        on:click={() => {signIn("google", {callbackUrl: window.location.href + (window.location.href.endsWith('/')?"" : "/") + "?loginSuccess"})}}
        class="border-[2px] text-center font-bold lg:py-4 {
          data.event.pass == "flagship"?"border-[#26e2faaf] hover:bg-[#26e2faaf]"
          : data.event.pass == 'Standard'
          ? 'border-[#2564eb9c] hover:bg-[#2564eb9c]'
          : data.event.pass == 'Proshow'
          ? 'border-[#e5d016] hover:bg-[#e5c91696]'
          :  data.event.pass == 'esports'
          ? 'border-[#e63c3c] hover:bg-[#e63c3c]'
          : data.event.pass == 'Free'
          ? 'border-[#19a3199b] hover:bg-[#19a3199b]'
          : 'border-[#0e5f0e9b] hover:bg-[#0e5f0e9b]'} w-full transition-all duration-200 text-white font-sans py-2 px-4 rounded-lg self-center"
      >Sign in to register</button>
        {:else if !RegDisable}
        <a
        href={data.event?.reglink || ""}
        class="border-[2px] text-center font-bold lg:py-4 {
          data.event.pass == "flagship"?"border-[#26e2faaf] hover:bg-[#26e2faaf]"
          : data.event.pass === 'Standard'
          ? 'border-[#2564eb9c] hover:bg-[#2564eb9c]'
          : data.event.pass == 'Proshow'
          ? 'border-[#e5d016] hover:bg-[#e5c91696]'
          :  data.event.pass == 'esports'
          ? 'border-[#e63c3c] hover:bg-[#e63c3c]'
          : data.event.pass == 'Free'
          ? 'border-[#19a3199b] hover:bg-[#19a3199b]'
          : 'border-[#0e5f0e9b] hover:bg-[#0e5f0e9b]'} w-full transition-all duration-200 text-white font-sans py-2 px-4 rounded-lg self-center"
      >{(data.event?.reglink)?"Register (external site)" : (data.event?.regneeded)?"Registrations opening soon!":"No registration needed"}</a>
      {:else}
      <a
      href={"/book"}
      class="border-[2px] text-center font-bold lg:py-4 {
        data.event.pass == "flagship"?"border-[#26e2faaf] hover:bg-[#26e2faaf]"
        : data.event.pass === 'Standard'
        ? 'border-[#2564eb9c] hover:bg-[#2564eb9c]'
        : data.event.pass == 'Proshow'
        ? 'border-[#e5d016] hover:bg-[#e5c91696]'
        :  data.event.pass == 'esports'
        ? 'border-[#e63c3c] hover:bg-[#e63c3c]'
        : data.event.pass == 'Free'
        ? 'border-[#19a3199b] hover:bg-[#19a3199b]'
        : 'border-[#0e5f0e9b] hover:bg-[#0e5f0e9b]'} w-full transition-all duration-200 text-white font-sans py-2 px-4 rounded-lg self-center"
    >{RegText}</a>
      {/if}
      
      </div>
      

    </div>

  </div>

  <div>
    <div class="max-md:mt-5 max-lg:mt-36 flex flex-col p-10 sm:px-20 md:px-24 lg:pr-10 lg:pl-5 lg:pt-0 lg:m-10 lg:ml-2 my-10 max-lg:text-center  ">
      <div class="w-fit">
        <div
        class="bg-clip-text text-left text-transparent bg-gradient-to-r  from-[#125ddf] to-[#F365E5] font-poppins font-normal max-lg:text-xl text-2xl"
      >
        <b>Date: </b><br class=" lg:hidden">{data.event?.date}
      </div>
      <div
        class="bg-clip-text max-lg:text-center text-transparent bg-gradient-to-r from-[#125ddf] to-[#F365E5] w-max font-poppins font-normal max-lg:text-xl text-2xl"
      >
        <b>Time: </b><br class="{data.event.time?.length < 20?"hidden":""} lg:hidden">{data.event?.time}
      </div>
      {#if data.event?.prizepool}
        <div
          class="bg-clip-text max-lg:text-center text-transparent bg-gradient-to-r from-[#125ddf]  to-[#F365E5] w-max font-poppins font-normal max-lg:text-xl text-2xl"
        >
          <b>Prize pool: </b><br class="{data.event.prizepool?.length < 10?"hidden":""} lg:hidden">{data.event?.prizepool}
        </div>
      {/if}
      <div
        class="bg-clip-text max-lg:text-center text-transparent bg-gradient-to-r from-[#125ddf] to-[#F365E5] max-lg:pb-4 w-max font-poppins font-normal max-lg:text-xl text-2xl"
      >
        <b>Venue: </b><br class="{data.event.venue?.length < 10?"hidden":""} lg:hidden">{data.event?.venue}
      </div>
      <div
      class="bg-clip-text max-lg:text-center text-transparent bg-gradient-to-r max-lg:pb-4 from-[#125ddf]  to-[#F365E5] w-max font-poppins font-normal max-lg:text-xl text-2xl"
    >
    {#if data.event.pass != "Free"}
    <div class=" flex flex-row font-bold">
      <div class="">Accessible with<span>&nbsp</span></div><div class="{
      data.event.pass == "flagship"?"capitalize":
      data.event.pass == "Proshow"?"text-[#e5d016] capitalize":
      data.event.pass == "Standard"?"text-[#2af2c0] capitalize":
      data.event.pass == "esports"?"text-[#e63c3c] capitalize":"text-[#ffffff]"}">{data.event.pass == "Standard"?"Any":data.event.pass}</div><div><span>&nbsp;</span>Pass.</div>
    </div>
    {:else}
    <div class=" text-[#19a3199b] flex flex-row font-bold">
      Open event, no pass required.
    </div>
      {/if}
      </div>
    </div>
      <h1 class="text-[3vh] font-poppins mt-5 text-white font-bold">About the event:</h1>
      <div class=" mt-5 max-lg:w-full lg:w-[45vw] mb-8 text-white text-justify">
        {#if data.event?.mdLink}
          <MarkdownBox url={ data.event?.mdLink } />
        {/if}

        {#each data.event?.longDescription as { text, br }}
          {text}
          {@html br}
          {@html br}
        {/each}
      </div>
      <div class="flex flex-col mt-10 lg:mt-0 text-justify flex-grow-[1] text-white">
        {#if data.event?.rules.length > 0}
          {#if data.event?.rules[0] && data.event?.rules[0].text != ""}
            <h1 class="text-[3vh] max-lg:text-center font-bold font-poppins mb-5">Rules: {#if data.event?.rules[0].text.startsWith('https')}
              <a class=" underline" href={data.event?.rules[0].text}>Link</a>{/if}</h1>
            <div class=" lg:w-[45vw] mb-16">
              {#if !data.event?.rules[0].text.startsWith('https')}
                {#each data.event?.rules as { text, br }}
                {text}
                {@html br}
                {/each}
              {/if} 
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
