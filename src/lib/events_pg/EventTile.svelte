<script>
// @ts-nocheck

	/**
	 * @type {{ image: any; }}
	 */
	 export let data;
	 import SolsticeFullLogo from '../../../src/assets/SolsticeFullLogo.svg'
	 import{goto} from '$app/navigation';
</script>

<div class="m-10 h-min p-5 border-2 border-yellow-600 hover:bg-[#3c3c3c] hover:scale-110  transition-all duration-300 delay-100 ease-in-out  w-fit rounded-2xl flex justify-center flex-col items-center text-center text-white">
	<div class="flex w-full justify-start mb-2">
		<img src={SolsticeFullLogo} alt="SolsticeLogoMITBLR" /> 
	</div>
    <img src={data.image} alt="eventImage" class="rounded-3xl m-2 h-[150px]" width={220}/>
	<p class="text-2xl font-bold">{data.title}</p>
	<div class="w-[220px] m-2 text-xl font-light">
		<p>{data.shortDescription}</p>
	</div>
	<div class="w-full flex justify-end mt-2">
		<button class=" bg-gradient-to-tr from-[#D2691E] to-[#FFD700] hover:bg-blue-700 text-black font-sans py-2 px-4 rounded-xl" on:click={()=>{
			goto('/events/'+data._id)
		}}>Register</button>
	</div>
</div>
