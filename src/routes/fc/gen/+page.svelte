<script>
	import { enhance } from '$app/forms';
	import NavbarButton from '$lib/common/NavbarButton.svelte';

	export let data;
	export let form;
</script>

<main class="grid min-h-screen w-full place-items-center">
	{#if form?.success}
		<NavbarButton name={form.generatedCode} navroute="" isLogoutbtn={false} />
	
	{:else if data.generatedCode != null}
		<NavbarButton name={data.generatedCode} navroute="" isLogoutbtn={false} />
	{/if}

	<form action="?/genCode" method="post">
		<input
			type="radio"
			name="email_id"
			checked
			value={data.session.user.email}
			class="peer hidden"
		/>
		<div
			class="grid w-[40rem] grid-cols-{Object.keys(data.fcTypes)
				.length} gap-2 rounded-xl bg-gray-200 p-2"
		>
			{#each { length: Object.keys(data.fcTypes).length } as _, i}
				<div>
					<input
						type="radio"
						name="option"
						id={i.toString()}
						value="{Object.keys(data.fcTypes)[i]} {data.fcTypes[Object.keys(data.fcTypes)[i]]}"
						class="peer hidden"
						checked
					/>
					<label
						for={i.toString()}
						class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
						>{Object.keys(data.fcTypes)[i]} ({data.fcTypes[Object.keys(data.fcTypes)[i]]})</label
					>
				</div>
			{/each}
		</div>
		<button
			type="submit"
			class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
			>Generate FOOD COUPON</button
		>
		<button
			type="submit"
			formaction="?/invalidateCurrentCode"
			class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
			>Invalidate current FOOD COUPON</button
		>
	</form>
</main>
