<script>
// @ts-nocheck

	/**
	 * @type {{ image: any; }}
	 */
	 export let data;
	 import SolsticeFullLogo from '../../../src/assets/SolsticeFullLogo.svg'
</script>

<div class="m-10 p-5 border-2 border-yellow-600  w-fit rounded-2xl flex justify-center flex-col items-center text-center text-white">
	<div class="flex w-full justify-start mb-2">
		<img src={SolsticeFullLogo} alt="SolsticeLogoMITBLR" /> 
	</div>
    <img src={data.image} alt="eventImage" class="rounded-3xl" width={220} height={220}/>
	<p class="text-2xl font-bold">{data.name}</p>
	<div class="w-[220px] m-2 text-xl font-light">
		<p>{data.slug}</p>
	</div>
	<div class="w-full flex justify-end mt-2">
		<button class=" bg-gradient-to-tr from-[#D2691E] to-[#FFD700] hover:bg-blue-700 text-black font-sans py-2 px-4 rounded-xl" on:click={()=>{}}>Register</button>
	</div>
</div>
