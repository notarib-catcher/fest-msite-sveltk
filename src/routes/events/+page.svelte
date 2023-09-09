<script>
	// @ts-nocheck

	import BgAnim from '$lib/common/BGAnim.svelte';
	import EventTile from '$lib/events_pg/EventTile.svelte';
	// import { Container } from 'postcss';
	// import { each, onMount } from 'svelte/internal';

	// let particles = 300
	// let m = {x: 0,y:0}
	// let multiplier = -10

	// function newanimate(){

	//   var root = document.querySelector(':root');
	//   root.style.setProperty('--x', `${Math.random()*window.innerWidth}%`);
	//   root.style.setProperty('--y', `${Math.random()*window.innerHeight}%`);
	// }

	//   function handleMouse(event){
	//     m.x = multiplier*event.clientX;
	//     m.y = multiplier*event.clientY;
	//     var root = document.querySelector(':root');
	//     root.style.setProperty('--x', `${m.x}%`);
	//     root.style.setProperty('--y', `${m.y}%`);
	//   }
	// onMount(()=>{
	//   var countainer = document.getElementById("stars")
	//   for(let i =0;i<particles;i++)
	//   countainer.innerHTML += `<div class=" bg-white h-[3px] w-[3px] rounded-full blur-[1px] absolute ease-in-out s-N-9Ekhs3dG6k" style="top: ${Math.random()*window.innerHeight*1.5}px;left: ${Math.random()*innerWidth*1.5}px;opacity:${Math.random()}" id="star"></div>`
	// })

	export let data;

	// let topevents = data.events.filter((event) => {
	// 	return event.pass == 'Flagship' || event.pass == 'Proshow' || event._id == 'hacksolstice';
	// });

	// let band = topevents.pop();
	// let hackathon = topevents.pop();
	// let dj = topevents.pop();
	// // adds element to the begining of the array
	// topevents.unshift(dj);
	// topevents.unshift(band);
	// topevents.unshift(hackathon);
	// //  let hackathon = topevents.pop()
	// //  let dj = topevents.pop()
	// //  let thunt = topevents.pop()

	// //  topevents.unshift(dj)
	// //  topevents.unshift(thunt)
	// //  topevents.unshift(hackathon)

	// for (let i in topevents) {
	// 	topevents[i].forceTop = true;
	// }

	// // all the events except the ones included in topevent
	// let remainingevents1 = data.events.filter((event) => {
	// 	return !topevents.includes(event);
	// });

	// let freeevents = remainingevents1.filter((event) => {
	// 	return event.pass.toLowerCase() == 'free';
	// });

	// // all the events except the ones included in topevents and freeevents
	// let remainingevents2 = remainingevents1.filter((event) => {
	// 	return !freeevents.includes(event);
	// });

	// let standard = remainingevents2.filter((event) => {
	// 	return event.pass.toLowerCase() == 'standard';
	// });

	// let esports = remainingevents2.filter((event) => {
	// 	return !standard.includes(event);
	// });
</script>

<BgAnim />
<div>
	<!-- <div class="stars  h-full fixed -z-10 w-full stars" id="stars">
      <div class="bg-white h-1 w-1 rounded-full blur-[2px] absolute" style="top: 90px;left:90px" id="star"></div>
    </div> -->
	<div class="pt-16 max-md:pt-5 text-white">
		{#if data.events.status === 'success'}
			{#each Object.entries(data.priorityCategories) as [name, info]}
				<h1>{info.displayName}</h1>
				{#each data.events.detail as event}
					{#if event.attributes.PriorityOnWebsite >= info.from && event.attributes.PriorityOnWebsite <= info.to}
						<h2>&emsp;&nbsp;Event Name -> {event.attributes.Heading}</h2>
						<h2>&emsp;&emsp;&nbsp;Event Description -> {event.attributes.Description}</h2>
					{/if}
				{/each}
			{/each}
		{/if}
	</div>
	<!-- <div class=" pt-16 max-md:pt-5 md:px-20 max-w-full flex flex-col justify-center left-0 min-w-min">
		<div class="w-full flex flex-col lg:flex-row">
			<h1
				class="text-6xl max-md:text-3xl mb-4 font-bold bg-gradient-to-tr from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent w-full max-lg:text-center bg-clip-text"
			>
				Top Events
			</h1>
			<div class=" font-semibold w-full lg:text-right max-md:text-lg text-center text-xl">
				<a
					class=" border-b-2 hover:border-[#2e75b3] border-[#7945bd] hover:from-[#3BACC1] hover:via-[#2D6DB1] hover:to-[#3BACC1] hover:bg-gradient-to-r hover:bg-clip-text from-[#D283B8] to-[#D283B8] via-[#6738BE] bg-gradient-to-r bg-clip-text focus:from-[#3BACC1] focus:via-[#2D6DB1] focus:to-[#3BACC1] focus:bg-gradient-to-r focus:bg-clip-text duration-100 font-semibold hover:font-bold underline text-transparent pt-3"
					href="https://cdn.mitblrfest.in/final.pdf">You can find the final schedule here</a
				>.
			</div>
		</div>

		<div class="flex flex-row flex-wrap justify-center items-center">
			{#each topevents as event}
				{#if !event.hide}
					<EventTile data={event} />
				{/if}
			{/each}
		</div>

		<h1
			class="text-6xl max-md:text-3xl mt-10 mb-4 font-bold bg-gradient-to-tr from-[#26bf87] via-[#17d337] to-[#26bf87] text-transparent w-full max-lg:text-center bg-clip-text"
		>
			Open to all
		</h1>
		<div class="flex flex-row flex-wrap justify-center items-center">
			{#each freeevents as event}
				{#if !event.hide}
					<EventTile data={event} />
				{/if}
			{/each}
		</div>
		<h1
			class="text-6xl max-md:text-3xl mt-10 mb-4 font-bold bg-gradient-to-tr from-[#6212a4] via-[#2D6DB1] to-[#6212a4] text-transparent w-full max-lg:text-center bg-clip-text"
		>
			Fun Mini events
		</h1>
		<div class="flex flex-row flex-wrap justify-center items-center">
			{#each standard as event}
				{#if !event.hide}
					<EventTile data={event} />
				{/if}
			{/each}
		</div>
		<h1
			class="text-6xl max-md:text-3xl mt-10 mb-4 font-bold bg-gradient-to-tr from-[#880cae] via-[#9c434b] to-[#880cae] text-transparent w-full max-lg:text-center bg-clip-text"
		>
			Esports Competitions
		</h1>
		<div class="flex flex-row flex-wrap justify-center items-center">
			{#each esports as event}
				{#if !event.hide}
					<EventTile data={event} />
				{/if}
			{/each}
		</div> -->
	<!-- </div> -->
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
