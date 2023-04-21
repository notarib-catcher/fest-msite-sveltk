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
	class=" border border-[#D4AF37] first-letter: overflow-hidden group-[imghov] relative m-6 pt-0 h-[650px] max-w-[400px] w-fit hover:scale-110 transition-all duration-300 delay-100 ease-in-out rounded-2xl flex justify-between flex-col items-center text-center text-white"
>
	<div class=" relative flex w-full justify-between mb-2">
		<div class="relative pt-6 -z-[1]">
			<img src={SolsticeFullLogo} alt="logo" />
		</div>

		<div
			class="  z-[1] h-0 w-0 mr-1 capitalize flex justify-center items-end border-[30px] border-t-[50px] border-x-[32px] bg-black bg-opacity-0 border-b-transparent {data.pass ===
			'Flagship'
				? 'border-[#9a0b0b8a]'
				: data.pass === 'Standard'
				? 'border-[#2564eb9c] '
				: data.pass == 'Proshow'
				? 'border-[#c59421cb]'
				:  data.pass == 'Esports'
				? 'border-[#d620ffcb]'
				: data.pass == 'Free'
				? 'border-[#18ff189b]'
				: 'border-[#0e5f0e9b]'}"
		>
			<p class="text-[12px] -translate-y-3 font-bold">{data.pass}</p>
		</div>
	</div>
	<img
		src={data.image}
		alt="eventImage"
		class=" w-full h-[230px] group-[imghov] absolute -z-1"
		width={220}
	/>
	<p class="text-2xl font-bold">{data.title}</p>
	<div class=" relative w-full h-full bgshadow p-5 transition-all duration-300 peer">
		<div class="w-[200px] max-w-full m-2 text-xl translate-y-24 font-light relative z-[2]">
			<p>{data.shortDescription}</p>
		</div>
	</div>

	<div class="flex justify-end mt-2 z-[1] bottom-0 flex-col text-center ">
		{#if data.prizepool != undefined}
			<div class="mt-10 w-full">
				<p class="text-white font-normal">Prize pool: {data.prizepool}</p>
			</div>
		{/if}
		{#if data.team != undefined}
			<div class="m-2 w-full flex justify-center mb-5">
				<p class="text-white font-normal">Team: {data.team}</p>
			</div>
		{/if}
		<a
			href={'/events/' + data._id}
			class=" mx-auto mb-8 bg-gradient-to-tr from-[#a123a8] to-[#e4c724] hover:bg-blue-700 transition-all duration-200 text-white font-normal py-2 px-4 rounded-lg"
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
</style>
