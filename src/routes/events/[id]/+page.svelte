<script>
  const txtcdnURL = "https://txtcdn.mitblrfest.in/api/events"
  export let data
	import { browser } from "$app/environment";
	import { onMount } from "svelte";


  import trophy from "../../../assets/trophy-solid.svg"
  import MDConverter from "$lib/events_pg/MDConverter.svelte";
	import BgAnim from "$lib/common/BGAnim.svelte";

  let event = {}
  $: LImage = event.Image
  $: PImage = event.Pimage
  $: FirstPlacePrize = event.FirstPlacePrize
  $: SecondPlacePrize = event.SecondPlacePrize
  $: ThirdPlacePrize = event.ThirdPlacePrize
  $: TimeofEvent = new Date(event.EventOn) 
  $: Description = event.Description
  $: Priority = event.Priority
  
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

  $: priclass = getpric(Priority)

  let getpric = (priority) => {


    if(priority <= 1000){
		 return "featuredhdg"
    }
    else if (priority <= 2000){
      return "sportshdg"
    }
    else if (priority <= 3000){
      return "culturalhdg"
    }
    else{
      return "esportshdg"
    }
  }
	
  
</script>
<BgAnim />
<div class="flex flex-col w-screen h-fit mt-10">
  <img src={LImage} class=" xl:w-[80vw] w-[90vw] rounded-lg mx-auto">
  <div class="flex items-center justify-center flex-col bg-black bg-opacity-70 box-border xl:w-[80vw] w-[90vw] ml-[5vw] xl:ml-[10vw] mt-5 rounded-xl">
    <!-- landscape Image -->
    

    <!-- Buttons -->
    {#if data.session}
    <div class=" w-screen px-[5vw] xl:px-[10vw] sm:grid sm:grid-cols-2 sm:justify-between sm:mt-5 mt-2">
      
        <div class=" flex items-center justify-center w-[100%] max-sm:w-full">
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
        <div class= "flex items-center justify-center  w-[100%] max-sm:mt-2">
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
        Please Login to {data.needreg?"Register":"buy a pass"}
      </button>
    </div>
    {/if}

    <!-- Landscape text -->
    <div class=" w-screen px-[9vw] xl:px-[14vw] flex flex-col sm:flex-row sm:mt-10 mt-5 ">
      <div class="w-[50vw] xl:w-[40vw] h-fit font-monster flex-row flex items-center uppercase text-white">
        <div class=" flex flex-col items-start h-fit">
          <div class="{priclass} text-3xl md:text-4xl lg:text-5xl xl:text-6xl h-fit">
            {event.Heading}
          </div>
          <span class="text-md lg:text-xl font-uni font-semibold">
            Oct {TimeofEvent.getDate()} at {TimeofEvent.getHours() + ":" + (TimeofEvent.getMinutes() < 10?"0"+TimeofEvent.getMinutes():TimeofEvent.getMinutes())}
          </span>
        </div>
      </div>

      <div class="w-[50vw] xl:w-[40vw] h-10 flex  text-white flex-row-reverse items-center max-sm:hidden"> 
        {#if ThirdPlacePrize}
          <div class=" flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px">
              <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path fill="#A05822" d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>
            </svg>
            <span class="ml-1 text-lg lg:text-xl ">
              {ThirdPlacePrize}
            </span>
          </div>
        {/if}

        {#if SecondPlacePrize}
          <div class=" flex flex-row mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px">
              <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path fill="#C0C0C0" d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>
            </svg>
            <span class="ml-1 text-lg lg:text-xl">
              {SecondPlacePrize}
            </span>
          </div>
        {/if}
        
        {#if FirstPlacePrize}
          <div class=" flex flex-row mr-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px">
              <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path fill="#FFD700" d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>
            </svg>
            <span class="ml-1 text-lg lg:text-xl">
              {FirstPlacePrize}
            </span>
          </div>
        {/if}
      </div>
      <div class="sm:w-[50vw] xl:w-[40vw] h-10 flex  text-white flex-row items-center sm:hidden"> 
        {#if FirstPlacePrize}
          <div class=" flex flex-row mr-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px">
              <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path fill="#FFD700" d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>
            </svg>
            <span class="ml-1 text-lg lg:text-xl">
              {FirstPlacePrize}
            </span>
          </div>
        {/if}

        {#if SecondPlacePrize}
          <div class=" flex flex-row mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px">
              <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path fill="#C0C0C0" d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>
            </svg>
            <span class="ml-1 text-lg lg:text-xl">
              {SecondPlacePrize}
            </span>
          </div>
        {/if}

        {#if ThirdPlacePrize}
          <div class=" flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px">
              <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path fill="#A05822" d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>
            </svg>
            <span class="ml-1 text-lg lg:text-xl ">
              {ThirdPlacePrize}
            </span>
          </div>
        {/if}

        
        
        
      </div>
    </div>

    <!-- Markdown Body -->

    <div class="px-[9vw] xl:px-[14vw] mb-5 w-screen mt-5 text-white">
      {#if Description}
         <MDConverter markdown={Description} />
      {/if}
    </div>
  </div>
</div>