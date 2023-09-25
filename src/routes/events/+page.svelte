<script>
	import { browser } from '$app/environment';

	// @ts-nocheck
	const txtcdnURL = "https://txtcdn.mitblrfest.in/api/events"
	import BgAnim from '$lib/common/BGAnim.svelte';
	import EventTile from '$lib/events_pg/EventTile.svelte';
	import About from '$lib/home_pg/About.svelte';
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';

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
				console.log(festEvent.attributes.Priority)
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

			FeaturedEvents = FeaturedEventsTemp
			SportsEvents = SportsEventsTemp
			CulturalEvents = CulturalEventsTemp
			EsportsEvents = EsportsEventsTemp

		}
	})

</script>

<BgAnim />
<div class="h-fit w-screen flex mt-10 items-center justify-center flex-col p-10">
	
	<div class=" w-fit h-fit">
		<div class=" text-6xl w-full text-center md:text-left mb-10 text-[#FE786F] font-yatra">
			Featured Events
		</div>
		<div class=" grid grid-flow-row gap-16  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5 xl: ">
			{#each FeaturedEvents as festEvent}
				<EventTile eventID={festEvent.attributes.EventID} cscheme={festEvent.attributes.Cscheme} imageURL={festEvent.attributes.PImage} heading={festEvent.attributes.Heading} shortDesc={festEvent.attributes.ShortDescription}></EventTile>
			{/each}
		</div>
		<div class="mt-10 text-6xl w-full text-center md:text-left mb-10 text-[#0ebaaa] font-yatra">
			Sports Events
		</div>
		<div class=" grid grid-flow-row gap-16  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5 xl: ">
			{#each SportsEvents as festEvent}
				<EventTile eventID={festEvent.attributes.EventID} cscheme={festEvent.attributes.Cscheme} imageURL={festEvent.attributes.PImage} heading={festEvent.attributes.Heading} shortDesc={festEvent.attributes.ShortDescription}></EventTile>
			{/each}
		</div>
		<div class="mt-10 text-6xl w-full text-center md:text-left mb-10 text-[#1095ff] font-yatra">
			Cultural Events
		</div>
		<div class=" grid grid-flow-row gap-16  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5 xl: ">
			{#each CulturalEvents as festEvent}
				<EventTile eventID={festEvent.attributes.EventID} cscheme={festEvent.attributes.Cscheme} imageURL={festEvent.attributes.PImage} heading={festEvent.attributes.Heading} shortDesc={festEvent.attributes.ShortDescription}></EventTile>
			{/each}
		</div>
		<div class="mt-10 text-6xl w-full text-center md:text-left mb-10 text-[#ed008c] font-yatra">
			E-Sports Events
		</div>
		<div class=" grid grid-flow-row gap-16  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5 xl: ">
			{#each EsportsEvents as festEvent}
				<EventTile eventID={festEvent.attributes.EventID} cscheme={festEvent.attributes.Cscheme} imageURL={festEvent.attributes.PImage} heading={festEvent.attributes.Heading} shortDesc={festEvent.attributes.ShortDescription}></EventTile>
			{/each}
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
