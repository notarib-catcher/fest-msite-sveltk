<script>
// @ts-nocheck

	/**
	 * @type {{ image: any; }}
	 */
	 export let data;
</script>

<div class="p-5 border w-fit">
    <img src={data.image} alt="event image" width={220} height={220}/>
	<p>{data.name}</p>
	<p>{data.pass}</p>
	<p>{data.slug}</p>
</div>
