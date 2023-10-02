<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	// @ts-nocheck
	const txtcdnURL = "https://txtcdn.mitblrfest.in/api/events"
	import BgAnim from '$lib/common/BGAnim.svelte';
	import EventTile from '$lib/events_pg/EventTile.svelte';
	import { onMount } from 'svelte';



	import EventPlaceholder from '$lib/events_pg/EventPlaceholder.svelte';

	let arrayofexamples = [1,2]

	let FeaturedEvents = []
	let SportsEvents = []
	let CulturalEvents = []
	let EsportsEvents = []

	onMount(async () => {
		if(browser){
			let eventData = (await (await fetch(txtcdnURL)).json()).data
			
			if(!eventData){
				console.warn("[FETCH] No event data found")
			}

			let FeaturedEventsTemp = []
			let SportsEventsTemp = []
			let CulturalEventsTemp = []
			let EsportsEventsTemp = []
			
			for(let festEvent of eventData){

				if(festEvent.attributes.Priority <= 1000){
					FeaturedEventsTemp.push(festEvent)
				}
				else if(festEvent.attributes.Priority <= 2000){
					SportsEventsTemp.push(festEvent)
				}
				else if(festEvent.attributes.Priority <=3000){
					CulturalEventsTemp.push(festEvent)
				}
				else{
					EsportsEventsTemp.push(festEvent)
				}
			}

			FeaturedEventsTemp.sort((a,b) => a.attributes.Priority - b.attributes.Priority)
			SportsEventsTemp.sort((a,b) => a.attributes.Priority - b.attributes.Priority)
			CulturalEventsTemp.sort((a,b) => a.attributes.Priority - b.attributes.Priority)
			EsportsEventsTemp.sort((a,b) => a.attributes.Priority - b.attributes.Priority)

			FeaturedEvents = FeaturedEventsTemp
			SportsEvents = SportsEventsTemp
			CulturalEvents = CulturalEventsTemp
			EsportsEvents = EsportsEventsTemp

			
			const sc2 = $page.url.searchParams.get('scrollto')

			let cehdg = document.getElementById('cehdg')
			let fehdg = document.getElementById('fehdg')
			let sehdg = document.getElementById('sehdg')
			let eehdg = document.getElementById('eehdg')
			

			switch(sc2){
				case 'ce':

					cehdg?.scrollIntoView()
					break;
				case 'se':

					sehdg?.scrollIntoView()
					break;
				case 'fe':

					fehdg?.scrollIntoView()
					break;
				case 'ee':
	
					eehdg?.scrollIntoView()
					break;
				
				
			}
		}
	})

</script>

<BgAnim />
<div class="h-fit w-screen flex mt-10 items-center justify-center flex-col p-[5vw]">
	
	<div class=" w-fit h-fit">
		<div class=" text-6xl w-full text-center md:text-left mb-10 text-[#FE786F] font-monster" id="fehdg">
			Featured Events
		</div>
		<div class=" grid grid-flow-row lg:grid-cols-2 grid-cols-1 gap-10 ">
			
			{#if FeaturedEvents.length > 0}
				{#each FeaturedEvents as festEvent}
					<EventTile eventID={festEvent.attributes.EventID} cscheme={festEvent.attributes.Cscheme} imageURL={festEvent.attributes.PImage} heading={festEvent.attributes.Heading} shortDesc={festEvent.attributes.ShortDescription} priority={festEvent.attributes.Priority}></EventTile>
				{/each}
			{:else}
				{#each arrayofexamples as example}
					<EventPlaceholder />
				{/each}
			{/if}
			
		</div>
		<div class="mt-10 text-6xl w-full text-center md:text-left mb-10 text-[#1095ff] font-monster" id="cehdg">
			Cultural Events
		</div>
		<div class=" grid grid-flow-row lg:grid-cols-2 grid-cols-1 gap-10 ">
			{#if CulturalEvents.length > 0}
				{#each CulturalEvents as festEvent}
					<EventTile eventID={festEvent.attributes.EventID} cscheme={festEvent.attributes.Cscheme} imageURL={festEvent.attributes.PImage} heading={festEvent.attributes.Heading} shortDesc={festEvent.attributes.ShortDescription} priority={festEvent.attributes.Priority}></EventTile>
				{/each}
			{:else}
				{#each arrayofexamples as example}
					<EventPlaceholder />
				{/each}
			{/if}
		</div>
		<div class="mt-10 text-6xl w-full text-center md:text-left mb-10 text-[#0ebaaa] font-monster" id="sehdg">
			Sports Events
		</div>
		<div class=" grid grid-flow-row lg:grid-cols-2 grid-cols-1 gap-10 ">
			{#if SportsEvents.length > 0}
				{#each SportsEvents as festEvent}
					<EventTile eventID={festEvent.attributes.EventID} cscheme={festEvent.attributes.Cscheme} imageURL={festEvent.attributes.PImage} heading={festEvent.attributes.Heading} shortDesc={festEvent.attributes.ShortDescription} priority={festEvent.attributes.Priority}></EventTile>
				{/each}
			{:else}
				{#each arrayofexamples as example}
					<EventPlaceholder />
				{/each}
			{/if}
		</div>
		<div class="mt-10 text-6xl w-full text-center md:text-left mb-10 text-[#ed008c] font-monster" id="eehdg">
			E-Sports Events
		</div>
		<div class="  grid grid-flow-row lg:grid-cols-2 grid-cols-1 gap-10 ">
			{#if EsportsEvents.length > 0}
				{#each EsportsEvents as festEvent}
					<EventTile eventID={festEvent.attributes.EventID} cscheme={festEvent.attributes.Cscheme} imageURL={festEvent.attributes.PImage} heading={festEvent.attributes.Heading} shortDesc={festEvent.attributes.ShortDescription} priority={festEvent.attributes.Priority}></EventTile>
				{/each}
			{:else}
				{#each arrayofexamples as example}
					<EventPlaceholder />
				{/each}
			{/if}
		</div>
	</div>
	
</div>


<style>
	/* :root{
    --x : 100%;
    --y : 100%;
  } */

	/* .stars div{
    transform: translate(var(--x),var(--y));
  } */
</style>
