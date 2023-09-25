<script>
  const txtcdnURL = "https://txtcdn.mitblrfest.in/api/events"
  export let data
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

  let event = {}
  $: LImage = event.Image
  $: PImage = ""
  onMount(async () => {
    if(browser){
      let eventData = (await (await fetch(txtcdnURL)).json()).data
      for(let e of eventData){
        if(e.attributes.EventID == data.eventID){
          // let attrs = e.attributes
          // LImage = attrs.Image
          // PImage = attrs.PImage
          event = e.attributes
          break
        }
      }
    }
  })
  
</script>

<div class="flex flex-col w-screen h-fit mt-10">
  
  <div class="flex items-center justify-center flex-col">
    <!-- landscape -->
    <img src={LImage} class=" xl:w-[80vw] w-[90vw] rounded-lg max-sm:hidden">
    {#if data.session}
    <div class=" w-screen px-[5vw] xl:px-[10vw] grid grid-cols-2 justify-between mt-5">
      
        <div class=" flex items-center justify-center w-[100%]">
          {#if data.reg.team.reg && !data.pass}
            <button class=" rounded-lg text-center w-[90%] p-2 text-gray-500 border-gray-500 border-2 " disabled>
              Purchase not required
            </button>
          {:else if data.pass}
            <button class=" rounded-lg text-center w-[90%] p-2 bg-green-800 bg-clip-text text-transparent border-green-800 border-2" disabled>
              You have a pass ✔️
            </button>
          {:else if event.TeamEvent}
            <button class=" rounded-lg text-center w-[90%] p-2 text-white border-white border-2 hover:scale-105 active:scale-95 transition-all duration-200">
              Team captain? Buy a pass
            </button>
          {:else}
            <button class=" rounded-lg text-center w-[90%] p-2 text-white border-white border-2 hover:scale-105 active:scale-95 transition-all duration-200">
              Get a pass
            </button>
          {/if}
        </div>
        <div class= "flex items-center justify-center  w-[100%]">
          {#if !data.needreg}
            <button class=" rounded-lg text-center w-[90%] p-2 bg-green-800 bg-clip-text text-transparent border-green-800 border-2" disabled>
              No need to preregister
            </button>
          {:else if data.reg.team.reg}
            {#if data.reg.team.owner}
              <button class=" rounded-lg text-center w-[90%] p-2 bg-green-800 bg-clip-text text-transparent border-green-800 border-2" disabled>
                You registered your team ✔️
              </button>
            {:else}
              <button class=" rounded-lg text-center w-[90%] p-2 bg-green-800 bg-clip-text text-transparent border-green-800 border-2" disabled>
                Your team is competing ✔️
              </button>
            {/if}
          {:else if data.reg.solo}
            <button class=" rounded-lg text-center w-[90%] p-2 bg-green-800 bg-clip-text text-transparent border-green-800 border-2" disabled>
              Registered ✔️
            </button>
          {:else if data.pass}
            {#if !event.TeamEvent}
              <button class=" rounded-lg text-center w-[90%] p-2 text-[#1095ff] border-[#1095ff] border-2 hover:scale-105 active:scale-95 transition-all duration-200">
                Register now!
              </button>
            {:else}
              <button class=" rounded-lg text-center w-[90%] p-2 text-white border-white border-2 hover:scale-105 active:scale-95 transition-all duration-200">
                Create a team!
              </button>
            {/if}
          {:else}
            {#if !event.TeamEvent}
              <button class=" rounded-lg text-center w-[90%] p-2 bg-red-800 bg-clip-text text-transparent border-red-800 border-2" disabled>
                ❌ Registration requires pass
              </button>
            {:else}
            <button class=" rounded-lg text-center w-[90%] p-2 text-[#1095ff] border-[#1095ff] border-2 hover:scale-105 active:scale-95 transition-all duration-200">
                Join a team!
              </button>
            {/if}
          {/if}
        </div>
      </div>
    {:else}
    <div class=" flex items-center justify-center w-screen px-[5vw] xl:px-[10vw]">
      <button class=" w-full text-center h-fit relative p-2 rounded-lg mt-5 border-2 border-white text-white active:scale-95 hover:scale-105 transition-all duration-200 ">
        Please Login to register
      </button>
    </div>
      
      <!-- <button class=" text-center w-[90%] ">
        {#if data.needsreg}
          This event needs registration
        {:else}
          This event does not require pre-registration
        {/if}
      </button> -->
      
    {/if}
  </div>
</div>