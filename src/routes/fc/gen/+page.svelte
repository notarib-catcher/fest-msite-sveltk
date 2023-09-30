<script lang='ts'>
	import { enhance } from '$app/forms';
	import BgAnim from '$lib/common/BGAnim.svelte';
	import { onMount } from 'svelte';

	export let data;
	let amount = '';
	let color1 = { primary: 'f', text: '1', buttonText: '2' };
	let color2 = { primary: 'f', text: '1', buttonText: '2' };
	let colorMap = {
		'0': {
			primary: '#04022A',
			text: '#FFE500',
			buttonText: '#04022A'
		},
		'1': {
			primary: '#238A80',
			text: '#FFE500',
			buttonText: '#04022A'
		},
		'2': {
			primary: '#BD0070',
			text: '#FFE500',
			buttonText: '#04022A'
		}
	};

	onMount(() => {
		document.addEventListener('input', () => {
			amount = amount.replaceAll(/[^0-9]/g, '');
		});
		//@ts-ignore
		color1 = colorMap[`${Math.floor(Math.random() * 3)}`];
		//@ts-ignore
		color2 = colorMap[`${Math.floor(Math.random() * 3)}`];
	});

	let generateCouponPopup = false;
	function invertGenerateCoupon() {
		generateCouponPopup = !generateCouponPopup;
	}
	//@ts-ignore
	function attemptCodeGeneration(event) {
		console.log('WORKING');
		let formData = event.data;
		if (Number(amount) > 0 && /^\d+$/.test(amount)) {
			formData.set('amount', Number(amount));
			invertGenerateCoupon();
		} else {
			formData.set('amount', 'vaibhav');
			invertGenerateCoupon();
		}
	}
</script>

<div class="bg-transparent min-h-screen h-fit flex items-center justify-center flex-col gap-10">
	<BgAnim />
	{#if generateCouponPopup}
		<form
			action="?/genCode"
			method="post"
			use:enhance={(event) => {
				attemptCodeGeneration(event);
			}}
		>
			<div
				class=" fixed top-0 left-0 z-[9] w-screen max-xs:w-[600px] h-screen flex items-center justify-center font-normal fadeinSlow"
			>
				<div
					class="h-[450px] w-[320px] p-10 flex flex-col items-center justify-center border-solid border-2 z-[10]"
					style:background-color={color1.primary}
				>
					<div class="text-2xl font-monster mt-2 text-white">
						<p class="tracking-wide leading-10 text-center">Balance<br />{data.balance}</p>
					</div>
					<div class="flex flex-col justify-around items-center text-white mt-20">
						<input
							type="text"
							class="font-monster p-2 max-sm:text-sm placeholder:max-md:text-sm w-full bg-transparent outline-none duration-200 caret-[#ffffff5b] placeholder:text-white border-b-2 text-center"
							placeholder="AMOUNT OF COUPON"
							pattern="\d*"
							bind:value={amount}
						/>
					</div>

					<button
						class="bg-[#388e3c]/[0.6] px-12 py-2 hover:bg-[#388e3c]/[1] font-monster mt-auto"
						type="submit"
						>CONFIRM</button
					>
				</div>
				<button
					class=" pointer-events-auto fixed backdrop-blur-md top-0 left-0 h-screen w-screen cursor-pointer fadeinSlow"
					on:click={() => {
						invertGenerateCoupon();
					}}
				/>
			</div>
		</form>
	{/if}
	<div class="flex p-12 w-full items-center justify-center flex-col gap-5 sm:flex-row text-center">
		<p class="tracking-widest font-monster text-5xl text-[#FFE500] leading-10">CURRENT BALANCE</p>
		<p class="tracking-widest font-monster text-5xl leading-10 text-[#FFE500]">
			&nbsp;{data.balance}
		</p>
	</div>
	<div
		class="flex flex-row p-12 w-full flex-wrap items-center justify-center group divide-y-8 sm:divide-x-8 sm:divide-y-0 divide-dashed divide-[#FFE500] mt-[0px]"
	>
		<div
			class="lg:w-1/3 xl:w-1/3 md:w-1/2 sm:w-1/2 w-full h-[300px] transititon ease-out duration-100 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_0px_rgba(255,229,0,1)] p-5"
			style:background-color={color2.primary}
		>
			<div class="flex items-center justify-center mt-2 lg:mt-2 md:mt-2 sm:mt-2">
				<div
					class="lg:text-3xl xl:text-3xl md:text-3xl sm:text-2xl text-3xl font-monster"
					style:color={color2.text}
				>
					<p class="tracking-wider">COUPON</p>
				</div>
			</div>
			<div class="flex items-center justify-center min-h-[50%] lg:min-h-[65%] sm:min-h-[55%]">
				<div
					class="lg:text-2xl xl:text-2xl md:text-2xl sm:text-xl text-2xl font-monster text-center"
					style:color={color2.text}
				>
					<p class="tracking-wide leading-10">Amount</p>
					<p class="tracking-wider">
						{data.wallet}
					</p>
				</div>
			</div>
			<div
				class="flex flex-col lg:flex-row md:flex-col sm:flex-col xl:flex-row gap-2 items-center justify-around mt-3 sm:mt-1 md:mt-1"
			>
				<button
					class="lg:text-lg xl:text-xl md:text-sm sm:text-xs text-lg bg-[#388E3C]/[0.6] hover:bg-[#388E3C]/[1.0] w-full py-2 font-monster"
					on:click={invertGenerateCoupon}
					style:color={color2.buttonText}>GENERATE</button
				>
				<div class="w-full">
					<form action="?/invalidateCurrentCode" method="post">
						<button
							class="lg:text-lg xl:text-xl md:text-sm sm:text-xs text-lg font-monster bg-[#BA000D]/[0.6] w-full hover:bg-[#BA000D]/[1.0] py-2"
							type="submit"
							style:color={color2.buttonText}>INVALIDATE</button
						>
					</form>
				</div>
			</div>
		</div>
		{#if (typeof data.generatedCode != 'undefined' && data.generatedCode)}
			<div
				class="w-full sm:w-1/4 h-[300px] transition ease-out duration-100 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_0px_rgba(255,229,0,1)] rounded-b-xl sm:rounded-r-xl sm:rouded-b-none"
				style:background-color={color2.primary}
			>
				<div class="flex items-center justify-center min-h-[100%] lg:min-h-[95%] sm:min-h-[88%]">
					<div
						class="lg:text-2xl xl:text-3xl md:text-2xl sm:text-xl text-2xl font-monster tracking-wider"
						style:color={color2.text}
					>
						<p class="tracking-wider">{data.generatedCode}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="flex p-12 w-full items-center justify-center">
		<p class="tracking-wider font-monster text-5xl text-[#FFE500]">HISTORY</p>
	</div>
	<div
		class="flex flex-col p-12 w-full flex-wrap items-center justify-center divide-y-8 sm:divide-x-8 sm:divide-y-0 divide-dashed divide-[{color2.text}] gap-2"
	>
		{#if data.history != null}
			{#each { length: data.history.length } as _, i}
				<div
					class="lg:w-1/3 xl:w-1/3 md:w-1/2 sm:w-1/2 w-full h-[300px] transititon ease-out duration-100 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(255,229,0,1)] p-5"
					style:background-color={colorMap[`${Number(i) % 3}`].primary}
				>
					<div class="flex items-center justify-center mt-2 lg:mt-2 md:mt-2 sm:mt-2">
						<div
							class="lg:text-3xl xl:text-3xl md:text-3xl sm:text-2xl text-3xl
								font-monster"
							style:color={colorMap[`${Number(i) % 3}`].text}
						>
							<p class="tracking-wider">COUPON</p>
						</div>
					</div>
					<div
						class="flex items-center justify-center min-h-[85%] lg:min-h-[85%] sm:min-h-[85%] xl:min-h-[85%]"
					>
						<div
							class="lg:text-2xl xl:text-2xl md:text-2xl sm:text-xl text-2xl font-monster text-center"
							style:color={colorMap[`${Number(i) % 3}`].text}
						>
							<p class="tracking-wide leading-10">Amount</p>
							{#if data.history[i].type === 'REDEEMC'}
								<p class="tracking-wider leading-10">{data.history[i].wallet_amount}</p>
								<p class="tracking-wider">REDEEMED</p>
							{:else if data.history[i].type === 'NEWC'}
								<p class="tracking-wider leading-10">{data.history[i].new_wallet_amount}</p>
								<p class="tracking-wider">NEW CODE</p>
							{:else if data.history[i].type === 'SUSPC'}
								<p class="tracking-wider leading-10">{data.history[i].wallet_amount}</p>
								<p class="tracking-wider">SUSPENDED</p>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
<!-- <main class="grid min-h-screen w-full place-items-center overscroll-auto pt-20"> -->
<!-- {#if form?.success == true || data.generatedCode}
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
			class="grid w-[40rem] grid-cols-{Object.keys()
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
	
	{#if data.history != null}
		{#each { length: data.history.length } as _, i}
			<p class="text-white">
				{data.history[i]['type']}
				{data.history[i]['wallet_code']} -> {data.history[i]['new_wallet_code']}
			</p>
			<p class="text-white">{data.history[i]['timestamp']}</p>
		{/each}
	{/if}
</main> -->
