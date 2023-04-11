<script>
	export let data;
</script>

<div class="text-white">
	<h1 class="text-white">This is the individual event page</h1>

	<img src={data.event?.image} alt={data.event?.name} />
	<h3>{data.event?.name}</h3>
	<h3>{data.event?.longDescription}</h3>
	<h3>{data.event?.rules}</h3>
	<h3>{data.event?.slug}</h3>
	<h3>{data.event?.pass}</h3>
</div>
<button on:click={() => window.history.back()}
    class="bg-gradient-to-tr from-[#D2691E] to-[#FFD700]  text-black font-sans py-2 px-4 rounded-xl"
	>BUY {data.event?.pass.toUpperCase()} PASS NOW!</button
>
