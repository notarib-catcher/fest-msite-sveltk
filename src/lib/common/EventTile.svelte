<script>
// @ts-nocheck

	/**
	 * @type {{ image: any; }}
	 */
	 export let data;
</script>

<div class="p-5 border w-fit rounded-2xl flex justify-center flex-col items-center text-center">
    <img src={data.image} alt="event image" class="rounded-3xl" width={220} height={220}/>
	<p>{data.name}</p>
	<p>{data.pass}</p>
	<div class="w-[220px]">
		<p>{data.slug}</p>
	</div>
	<div>
		<button class="bg-yellow-700" on:click={()=>{}}>Register</button>
	</div>
</div>
