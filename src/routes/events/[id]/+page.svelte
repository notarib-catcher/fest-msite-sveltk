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
          console.log(event)
          break
        }
      }
    }
  })
  
</script>

<div class="flex flex-col w-screen h-fit mt-10">
  
  <div class="flex items-center justify-center flex-col">
    <!-- landscape -->
    <img src={LImage} class="w-[90vw] rounded-lg max-sm:hidden">
    <div class=" w-screen px-[5vw] grid grid-cols-2 justify-between mt-5">
      {#if data.session}
        <div class=" flex items-center justify-center w-[100%]">
          {#if data.reg.team.reg && !data.pass}
            <button class=" rounded-lg text-center w-[90%] p-2 text-gray-500 border-gray-500 border-2 " disabled>
              Pass not required
            </button>
          {:else if data.pass}
            <button class=" rounded-lg text-center w-[90%] p-2 bg-green-700 bg-clip-text text-transparent border-green-00 border-2" disabled>
              You have a pass ✔️
            </button>
          {:else if event.TeamEvent}
            <button class=" rounded-lg text-center w-[90%] p-2 text-white border-white border-2 hover:scale-105 focus:scale-105 active:scale-95 transition-all duration-200" disabled>
              {"(Team Captain)"} Get a pass
            </button>
          {:else}
            <button class=" rounded-lg text-center w-[90%] p-2 text-white border-white border-2 hover:scale-105 focus:scale-105 active:scale-95 transition-all duration-200" disabled>
              Get a pass
            </button>
          {/if}
        </div>
        <div class= "flex items-center justify-center  w-[100%]">
          <button class=" text-center w-[90%] ">
            Button 2
          </button>
        </div>
      {:else}
      <button class=" text-center w-[90%] ">
        Please Login
      </button>
      {/if}
    </div>
  </div>
</div>