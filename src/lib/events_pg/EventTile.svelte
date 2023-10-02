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

	/**
	 * @type {number}
	 */
	 export let priority

	let priclass = ""
	if(priority <= 1000){
		priclass = "featuredecard"
	}
	else if (priority <= 2000){
		priclass = "sportsecard"
	}
	else if (priority <= 3000){
		priclass = "culturalecard"
	}
	else{
		priclass = "esportsecard"
	}

</script>


<div class=" max-w-[500px] w-[90vw] h-fit ecard {priclass} flex flex-col rounded-lg hover:scale-105 focus:scale-105 transition-all duration-200">
	 <img src={imageURL} class=" w-full p-2">
	 <div class=" w-full flex sm:flex-row flex-col">
		<div class=" pl-3 text-white h-fit w-full sm:w-[70%] max-sm:pr-2 mb-2">
			<span class=" font-uni font-bold text-xl">{heading}</span><br>
			<span class="max-sm:pr-2">{shortDesc || "Click to go to the event page"}</span>
		</div>
		<div class=" h-full sm:self-center w-[30%] max-sm:mb-2 max-sm:ml-3 font-uni">
			<div class=" w-full flex sm:justify-center">
				<a class=" h-full font-uni font-bold sm:mr-2 p-2 rounded-lg" href={shortDesc.toLowerCase().includes("coming soon")?"/events/":"/events/"+eventID}>
					More info
				</a>
			</div>
		</div>
	 </div>
</div>



<style>

	

	.ecard > div > div > div > button:hover {
		scale: 105%;
	}

	.ecard > div > div > div > button:active {
		scale: 95%;
	}

	.ecard > div > div > div > a {
    	background-color: #04022A;
    	color: #FFE500;
    	transition: all 200ms;
	}

</style>
