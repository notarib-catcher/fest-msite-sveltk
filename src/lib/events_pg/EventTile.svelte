<script>


	/**
	 * @type {string}
	 */
	export let eventID
	/**
	 * @type {string}
	 */
	export let shortDesc

	/**
	 * @type {string} 
	 * Requires one of these values:
	 * 	dark: Black text & Heading, 
	 * 	light: White text & Heading,
	 * 	alt-dark: Black heading & White text  
	 * 	alt-light: White heading & Black text
	 */
	export let cscheme

	/**
	 * @type {string}
	 */

	export let heading

	/**
	 * @type {string}
	 */
	export let imageURL

</script>
{#if cscheme == "dark"}

<div class="text-black font-yatra w-[225px] h-[400px] relative rounded-lg overflow-clip z-0 hover:z-[1] hover:scale-105 focus:z-[1] focus:scale-105 transition-all duration-200 bg-[#aaaaaa]">
	<!-- svelte-ignore a11y-missing-attribute -->
	<img class=" w-full h-full left-0 top-0 absolute z-[-1]" src={imageURL}>
	<div class="z-1 w-full h-[50px] top-0 absolute text-center p-2 text-xl font-semibold">
		{heading}
	</div>
	<div class="absolute w-full h-[50%] bg-black bottom-0 bg-opacity-30">
		<div class="absolute top-5 p-5 text-center">
			<span class=" w-full ">
				{shortDesc || "Click the button for more details!"}
			</span>
		</div>
		<div class=" absolute bottom-5 w-full flex items-center justify-center">
			<button class=" p-2 border-black rounded-md border-2 hover:scale-105 active:scale-95 focus:scale-105 transition-all duration-200" on:click={() => {window.location = "/events/" + eventID}}>
				More info
			</button>
		</div>
	</div>
	
</div>

{:else if cscheme == "light"}

<div class="text-white font-yatra w-[225px] h-[400px] relative rounded-lg overflow-clip z-0 hover:z-[1] hover:scale-105 focus:z-[1] focus:scale-105 transition-all duration-200 bg-[#aaaaaa]">
	<!-- svelte-ignore a11y-missing-attribute -->
	<img class=" w-full h-full left-0 top-0 absolute z-[-1]" src={imageURL}>
	<div class="z-1 w-full h-[50px] top-0 absolute text-center p-2 text-xl font-semibold">
		{heading}
	</div>
	<div class="absolute w-full h-[50%] bg-black bottom-0 bg-opacity-30">
		<div class="absolute top-5 p-5 text-center">
			<span class=" w-full ">
				{shortDesc || "Click the button for more details!"}
			</span>
		</div>
		<div class=" absolute bottom-5 w-full flex items-center justify-center">
			<button class=" p-2 border-white rounded-md border-2 hover:scale-105 active:scale-95 focus:scale-105 transition-all duration-200" on:click={() => {window.location = "/events/" + eventID}}>
				More info
			</button>
		</div>
	</div>
	
</div>

{:else if cscheme == "alt-dark"}

<div class="font-yatra w-[225px] h-[400px] relative rounded-lg overflow-clip z-0 hover:z-[1] hover:scale-105 focus:z-[1] focus:scale-105 transition-all duration-200 bg-[#aaaaaa]">
	<!-- svelte-ignore a11y-missing-attribute -->
	<img class=" w-full h-full left-0 top-0 absolute z-[-1]" src={imageURL}>
	<div class="text-black z-1 w-full h-[50px] top-0 absolute text-center p-2 text-xl font-semibold">
		{heading}
	</div>
	<div class="text-white absolute w-full h-[50%] bg-black bottom-0 bg-opacity-30">
		<div class="absolute top-5 p-5 text-center">
			<span class=" w-full ">
				{shortDesc || "Click the button for more details!"}
			</span>
		</div>
		<div class=" absolute bottom-5 w-full flex items-center justify-center">
			<button class=" p-2 border-white rounded-md border-2 hover:scale-105 active:scale-95 focus:scale-105 transition-all duration-200" on:click={() => {window.location = "/events/" + eventID}}>
				More info
			</button>
		</div>
	</div>
	
</div>

{:else if cscheme == "alt-light"}

<div class=" font-yatraw-[225px] h-[400px] relative rounded-lg overflow-clip z-0 hover:z-[1] hover:scale-105 focus:z-[1] focus:scale-105 transition-all duration-200 bg-[#aaaaaa]">
	<!-- svelte-ignore a11y-missing-attribute -->
	<img class=" w-full h-full left-0 top-0 absolute z-[-1]" src={imageURL}>
	<div class="text-white z-1 w-full h-[50px] top-0 absolute text-center p-2 text-xl font-semibold">
		{heading}
	</div>
	<div class="absolute w-full h-[50%] bg-black bottom-0 bg-opacity-30">
		<div class="absolute top-5 p-5 text-center">
			<span class=" w-full ">
				{shortDesc || "Click the button for more details!"}
			</span>
		</div>
		<div class=" absolute bottom-5 w-full flex items-center justify-center">
			<button class=" p-2 border-black rounded-md border-2 hover:scale-105 active:scale-95 focus:scale-105 transition-all duration-200" on:click={() => {window.location = "/events/" + eventID}}>
				More info
			</button>
		</div>
	</div>
	
</div>

{/if}
<style>

</style>
