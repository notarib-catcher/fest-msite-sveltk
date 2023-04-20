<script>
	import { rule } from "postcss";

	export let data;
</script>

<div class="text-white flex h-full items-center  flex-col py-[5vh]">
	<h3 class="m-[5vh] w-max text-center h-full font-poppins bg-gradient-to-tr font-bold from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] bg-clip-text text-transparent text-[6vh]">{data.event?.name}</h3>
	<div class="flex flex-row flex-wrap md:flex-nowrap mt-10 justify-evenly w-[95vw] h-full">
		<div class="relative flex flex-col w-[40vw] mx-7 flex-grow-[1] items-end">
			<img src={data.event?.image} alt={data.event?.name} class=" top-0 w-full rounded-lg shadow-xl shadow-black h-fit mb-[5vh]"/>
			<button on:click={() => window.history.back()}
				class="bg-gradient-to-tr from-[#D2691E] to-[#FFD700] w-max text-white font-sans py-2 px-4 rounded-xl"
				>Registrations will open soon!</button
			>
		</div>
		<div class="flex flex-col mt-10 sm:mt-0 px-6 flex-grow-[1]">
			<h1 class="text-[3vh] font-poppins mb-5">About the Event:</h1>
			<h3 class="ml-8 sm:w-[45vw] mb-8">{#each data.event?.longDescription as {text,br}}
				{text}
				{@html br}
				{@html br}
			{/each}</h3>
			<h1 class="text-[3vh] font-poppins mb-5">Rules:</h1>
			<h3 class="ml-8 sm:w-[45vw] mb-16">
			{#if data.event?.rules[0].text.startsWith("https")}
			<a class=" underline" href={data.event?.rules[0].text}>Link</a>
			{:else}
				{#each data.event?.rules as {text,br}}
				{text}
				{@html br}
				{/each}
			{/if}
			</h3>
			<h3 class="bg-clip-text text-transparent bg-gradient-to-r from-[#125ddf] to-[#F365E5] w-max font-poppins font-normal text-[3vh]">Date: </h3>
			<h3 class="bg-clip-text text-transparent bg-gradient-to-r from-[#125ddf] to-[#F365E5] w-max font-poppins font-normal text-[3vh]">Time: </h3>
			<h3 class="bg-clip-text text-transparent bg-gradient-to-r from-[#125ddf] to-[#F365E5] w-max font-poppins font-normal text-[3vh]">Award: </h3>
		</div>
	</div>
</div>
