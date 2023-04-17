

<script>
	// @ts-nocheck
	
		/**
		 * @type {{ image: any; }}
		 */
		 export let data;
		 import SolsticeFullLogo from '../../../src/assets/SolsticeFullLogo.svg'
		 import{goto} from '$app/navigation';
	</script>
	
	<div class="m-6 pt-0 h-[650px] p-5 border-2 max-w-[400px] w-fit border-yellow-600 hover:bg-[#303033] hover:scale-110  transition-all duration-300 delay-100 ease-in-out rounded-2xl flex justify-between flex-col items-center text-center text-white">
		<div class="flex w-full	justify-between mb-2">
			<div class="pt-6">
				<img src={SolsticeFullLogo} alt="SolsticeLogoMITBLR" /> 
			</div>
			<div class="h-0 w-0 flex justify-center items-end border-[17px] border-t-[22px] border-x-[30px] border-b-transparent {data.pass === 'flagship'? "border-red-600": data.pass==='mini'? "border-green-600":"border-blue-600"}" >
				<p class="text-[12px]">{data.pass}</p>
			</div>
		</div>
		<img src={data.image} alt="eventImage" class="rounded-3xl m-2 h-[165px]" width={220}/>
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
	
	
	