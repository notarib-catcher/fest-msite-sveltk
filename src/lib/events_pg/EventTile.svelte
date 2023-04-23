<script>
	// @ts-nocheck

	/**
	 * @type {{ image: any; }}
	 */
	export let data;
	import SolsticeFullLogo from '../../../src/assets/SolsticeFullLogo.svg';
	import { goto } from '$app/navigation';
</script>

<div
	class=" border-[2px] {
			data.forceTop?"border-[#26e2faaf]"
			: data.pass ==='Flagship'
			? 'border-[#f0efed]'
			: data.pass === 'Standard'
			? 'border-[#2564eb9c] '
			: data.pass == 'Proshow'
			? 'border-[#21adc5cb]'
			:  data.pass == 'Esports'
			? 'border-[#e63c3c]'
			: data.pass == 'Free'
			? 'border-[#18ff189b]'
			: 'border-[#0e5f0e9b]'} borderbox   overflow-hidden group-[imghov] relative md:m-6  my-6 pt-0 w-[291px] h-[547px]  hover:scale-105 transition-all duration-300  ease-in-out rounded-2xl flex justify-between flex-col items-center text-center text-white"
>
	<div class=" relative flex w-full justify-between mb-2">
		<div class="relative pt-6 pl-4 -z-[1]">
			<img src={SolsticeFullLogo} alt="logo" />
		</div>

		
			<p class="text-[18px] mt-6 mr-4 font-bold {
				data.pass ==='Flagship'
				? 'text-[#f0efed]'
				: data.pass === 'Standard'
				? 'text-[#2564eb9c] '
				: data.pass == 'Proshow'
				? 'text-[#21adc5cb]'
				:  data.pass == 'Esports'
				? 'text-[#e63c3c]'
				: data.pass == 'Free'
				? 'text-[#18ff189b]'
				: 'text-[#0e5f0e9b]'}">{data.pass}</p>
		
	</div>
	<img
		src={data.image}
		alt="eventImage"
		class="  h-[165px] w-[220px] rounded-xl top-16 group-[imghov] absolute -z-1"
		width={220}
	/>
	<div class=" relative flex justify-center w-full h-full bg-transparent p-5 transition-all duration-300 peer">
		<div class="w-[200px] pointer-events-none max-w-full m-2 text-[17.5px]  translate-y-40 font-light relative z-[2]">
			<p>{data.shortDescription}</p>
		</div>
	</div>

	<div class="flex justify-end z-[1] bottom-0 flex-col text-center ">
		{#if data.prizepool != undefined}
			<div class="mb-1 w-full">
				<p class="text-white font-normal">Prize pool: {data.prizepool}</p>
			</div>
		{/if}
		{#if data.team != undefined}
			<div class="w-full flex justify-center mb-2">
				<p class="text-white font-normal">Team: {data.team}</p>
			</div>
		{/if}
		<a
			href={'/events/' + data._id}
			class=" border-[2px] {
				data.forceTop?"text-[#26e2faaf]"
				: data.pass ==='Flagship'
				? 'border-[#f0efed] hover:bg-[#f0efed]'
				: data.pass === 'Standard'
				? 'border-[#2564eb9c] hover:bg-[#2564eb9c]'
				: data.pass == 'Proshow'
				? 'border-[#21adc5cb] hover:bg-[#21adc5cb]'
				:  data.pass == 'Esports'
				? 'border-[#e63c3c] hover:bg-[#e63c3c]'
				: data.pass == 'Free'
				? 'border-[#19a3199b] hover:bg-[#19a3199b]'
				: 'border-[#0e5f0e9b] hover:bg-[#0e5f0e9b]'} mx-auto mb-8  to-[#ffd900c7]  bg-opacity-10 transition-all duration-200 text-white font-normal py-2 px-4 rounded-lg"
			>Learn More</a
		>
	</div>
</div>

<style>
	.bgshadow {
		background-image: linear-gradient(
			to top,
			rgba(24, 24, 27, 1),
			rgba(24, 24, 27, 1),
			rgba(24, 24, 27, 1),
			rgba(24, 24, 27, 6),
			rgba(24, 24, 27, 0.7),
			rgba(24, 24, 27, 0)
		);
	}

	

	.borderbox:hover{
		box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.685);
	}

	.borderbox:focus{
		box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.685);
	}

	.borderbox:focus-within{
		box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.685);
	}
	
</style>
