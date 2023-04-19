

<script>
	// @ts-nocheck
	
		/**
		 * @type {{ image: any; }}
		 */
		 export let data;
		 import SolsticeFullLogo from '../../../src/assets/SolsticeFullLogo.svg'
		 import{goto} from '$app/navigation';
	</script>
	
	<div class=" overflow-hidden group-[imghov] relative m-6 pt-0 h-[650px] border-2 max-w-[400px] w-fit border-yellow-600   hover:scale-110  transition-all duration-300 delay-100 ease-in-out rounded-2xl flex justify-between flex-col items-center text-center text-white">
		<div class=" relative flex w-full	justify-between mb-2">
			<div class="relative pt-6 -z-[1] ">
				<img src={SolsticeFullLogo}> 
			</div>
			<div class=" relative z-[1] h-0 w-0 mr-1 capitalize flex justify-center items-end border-[30px] border-t-[50px] border-x-[32px] bg-black bg-opacity-20 border-b-transparent {data.pass === 'flagship'? "border-[#9a0b0b]": data.pass==='standard'? "border-[#0e5f0e]":"border-blue-600"}" >
				<p class="text-[12px] -translate-y-3 font-bold">{data.pass}</p>
			</div>
		</div>
		<img src={data.image} alt="eventImage" class=" w-full h-[230px] group-[imghov] absolute -z-1" width={220}/>
		<p class="text-2xl font-bold">{data.title}</p>
		<div class="relative w-full h-full bgshadow p-5  transition-all duration-300 peer">
			<div class="w-[220px] m-2 text-xl translate-y-24 font-light relative z-10 ">
				<p>{data.shortDescription}</p>
			</div>
		</div>
		
		<div class="w-full flex justify-end mt-2">
			<button class=" mx-auto mb-4 bg-gradient-to-tr from-[#4c2509] to-[#75660f] hover:bg-blue-700 transition-all duration-200 text-white font-light py-2 px-4 rounded-lg" on:click={()=>{
				goto('/events/'+data._id)
			}}>Learn More</button>
		</div>
	</div>
	
	<style>
		.bgshadow{
			background-image: linear-gradient(to top, rgba(24,24,27,1),rgba(24,24,27,1),rgba(24,24,27,1),rgba(24,24,27,1),rgba(24,24,27,1),rgba(24,24,27,0));
		}
	</style>
	
