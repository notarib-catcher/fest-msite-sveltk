<script>
	export let data;
</script>

<div class="text-white flex h-full items-center flex-col pt-[5vh]">
	<h3 class="m-[5vh] w-max text-center h-full font-poppins bg-gradient-to-tr font-bold from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] bg-clip-text text-transparent text-[6vh]">{data.event?.name}</h3>
	<div class="flex flex-row flex-wrap md:flex-nowrap mt-10 justify-evenly w-[95vw] h-full">
		<div class="flex flex-col w-[40vw] mx-7 flex-grow-[1] justify-evenly items-end">
			<img src={data.event?.image} alt={data.event?.name} class="w-full rounded-lg shadow-xl shadow-black h-fit mb-[5vh]"/>
			<button on:click={() => window.history.back()}
				class="bg-gradient-to-tr from-[#D2691E] to-[#FFD700] w-max text-white font-sans py-2 px-4 rounded-xl"
				>Register</button
			>
		</div>
		<div class="flex flex-col px-6 flex-grow-[1]">
			<h1 class="text-[3vh] font-poppins mb-5">About the Event:</h1>
			<h3 class="ml-8 w-[45vw] mb-8">{data.event?.longDescription}</h3>
			<h1 class="text-[3vh] font-poppins mb-5">Rules:</h1>
			<h3 class="ml-8 w-[45vw] mb-16">{data.event?.rules}</h3>
			<h3 class="bg-clip-text text-transparent bg-gradient-to-r from-[#125ddf] to-[#F365E5] w-max font-poppins font-normal text-[3vh]">Date: </h3>
			<h3 class="bg-clip-text text-transparent bg-gradient-to-r from-[#125ddf] to-[#F365E5] w-max font-poppins font-normal text-[3vh]">Time: </h3>
			<h3 class="bg-clip-text text-transparent bg-gradient-to-r from-[#125ddf] to-[#F365E5] w-max font-poppins font-normal text-[3vh]">Award: </h3>
		</div>
	</div>
</div>

