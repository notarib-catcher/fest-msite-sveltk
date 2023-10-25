<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	
	let colours = ["EC008C", "FE786F", "0EBAAA"]
	let clrRand = Math.floor(3 * Math.random())

	// @ts-ignore
	/**
	 * @type {string}
	 */
	export let name;
	// @ts-ignore
	/**
	 * @type {string | null | undefined}
	 */
	export let navroute;

	export let image;
	/**
	 * @type {boolean}
	 */
	export let isLogoutbtn;
	import { page } from '$app/stores';
	import Map from '$lib/home_pg/Map.svelte';
	// @ts-ignore
	name = name ?? '-';
</script>

{#if isLogoutbtn}
	<button disabled
		type="button"
		class="w-[100px] h-[100px] rounded-xl hover:scale-105 transition-all duration-200 active:scale-95 bg-opacity-20 bg-black"
		on:click={$page.data.session
			? async () => {
					await signOut({ callbackUrl: '/?logout' });
			  }
			: () => {
					signIn('google', {
						callbackUrl: 'http://localhost:80/?loginSuccess'
					});
			  }}
		data-sveltekit-preload-data
		><div class=" flex items-center justify-center flex-col">
			{#if $page.data.session}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30px">
				<!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				<path fill="white" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
			</svg>
			{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" width="30px">
				<!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				<path fill="white" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
			</svg>
			{/if}
			<span class="mt-2 font-thin">
				<!-- {$page.data.session ? 'Logout' : 'Login'} --> (Disabled)
			</span>
		</div></button
	>
{:else}
	{#key $page.url.pathname}
		<a href={navroute} class="w-[100px] h-[100px] rounded-xl hover:scale-105 transition-all duration-200 active:scale-95 bg-opacity-20 bg-black" >
			<div class=" h-full flex items-center justify-center flex-col">
				{#if image}
					<img src = {image} class=" max-h-[30px] max-w-[80px]">
				{/if}
				<span class="mt-2 font-thin">
					{name}
				</span>
			</div>
		</a>
	{/key}
{/if}

<!-- style="background-color: #{navroute !== "/"? colours[clrRand]:colours[1]};" -->