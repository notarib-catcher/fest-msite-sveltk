<script>
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import bgimg from '../../assets/starsbg.svg';
	import { Warning } from 'postcss';
	import EventTile from '$lib/events_pg/EventTile.svelte';
	/**
	 * @type {any}
	 */
	export let innerText;
	/**
	 * @type {any}
	 */
	export let title;

	export let category;

	const bgImage = `${bgimg}`;

	let noEvent;
	let noPhNum;
	let noTeamDeets;

	let phnum = '';
	let extradat = '';
	let refcode = '';
	let eventChosen = '';

	let sbbtn;
	let gval;
	let gsel;
	let defevent;
	let selevbox;
	let selevbox2;
	onMount(() => {
		document.addEventListener('input', () => {
			phnum = phnum.replaceAll(/[^0-9]/g, '');
			refcode = refcode.toUpperCase().replaceAll(/[^A-Z0-9]/g, '');
		});

		if (browser) {
			if (!category == 'ESPORTS') {
				defevent.selected = true;
			}

			setInterval(async () => {
				if (gsel) {
					gsel.disabled = !(phnum.length == 10 && category == 'SPORTS');
				}
				if (selevbox) {
					selevbox.disabled = gval == '' && category == 'SPORTS';
				}
				if (selevbox2) {
					selevbox2.disabled = !(category == 'CULTURAL' && phnum.length == 10);
				}

				sbbtn.disabled = !(
					(gval != '' || category != 'SPORTS') &&
					(eventChosen != '' || category == 'ESPORTS') &&
					phnum.length == 10
				);

				if (eventChosen != '') {
					let evprice = vpassarr2.filter((pass) => {
						return pass.type == eventChosen;
					})[0].INRcost;
					upBkTxt(evprice);
				}

				if (category == 'ESPORTS' && phnum.length == 10) {
					let evprice = vpassarr2.filter((pass) => pass.type == 'ESPORTS')[0].INRcost;
					console.log(evprice);
					upBkTxt(evprice);
				}
			}, 100);
		}
	});

	const sendDat = () => {
		noPhNum.classList.add('hidden');
		if (phnum == '' || phnum.length != 10) {
			noPhNum.classList.remove('hidden');
			return;
		}
		// noEvent.classList.add("hidden")
		// if(eventChosen == "" && (title.toLowerCase().includes("flagship") || title.toLowerCase().includes("esports"))){
		//     noEvent.classList.remove("hidden")
		//     return
		// }
		// noTeamDeets.classList.add("hidden")
		// if(extradat.trim() == "" && title.toLowerCase().includes("flagship")){
		//     noTeamDeets.classList.remove("hidden")
		//     return
		// }

		let data = {
			type: category == 'ESPORTS' ? 'ESPORTS' : eventChosen,
			event: eventChosen || 'NEVENT',

			phnum: phnum,
			refcode: ''
		};

		dispatch2('book', data);
	};

	const passarray = [
		//mens

		{
			type: 'SPORT_FB_M',
			name: "(CLOSED) Men's Football (per team cost)",
			INRcost: 5000,
			open: false
		},

		{
			type: 'SPORT_BB_M',
			name: "(CLOSED) Men's Basketball (per team cost)",
			INRcost: 3000,
			open: false
		},

		{
			type: 'SPORT_VB_M',
			name: "(CLOSED) Men's Volleyball (per team cost)",
			INRcost: 3000,
			open: false
		},

		{
			type: 'SPORT_TN_M',
			name: "(CLOSED) Men's Tennis (per team cost)",
			INRcost: 800,
			open: false
		},

		{
			type: 'SPORT_TT_M',
			name: "(CLOSED) Men's Table Tennis (per team cost)",
			INRcost: 800,
			open: false
		},

		//womens

		{
			type: 'SPORT_BB_F',
			name: "(CLOSED) Women's Basketball (per team cost)",
			INRcost: 2000,
			open: false
		},

		{
			type: 'SPORT_TB_F',
			name: "(CLOSED) Women's Throwball (per team cost)",
			INRcost: 2000,
			open: false
		},

		{
			type: 'SPORT_TN_F',
			name: "(CLOSED) Women's Tennis (Singles)",
			INRcost: 200,
			open: false
		},

		{
			type: 'SPORT_TT_F',
			name: "(CLOSED) Women's Table Tennis (Singles)",
			INRcost: 200,
			open: false
		},

		//gender neutral

		{
			type: 'SPORT_ATH',
			name: '(CLOSED) Athletics (Individual)',
			INRcost: 200,
			open: false
		},

		{
			type: 'SPORT_CHS',
			name: '(CLOSED) Chess',
			INRcost: 1500,
			open: false
		},

		//cultural

		{
			type: 'CLTR_PRO',
			name: '(PAUSED) Proshow and Cultural Events',
			INRcost: 799,
			open: false
		},
		{
			type: 'SUP_PRO',
			name: 'Superpass Proshow',
			INRcost: 550,
			open: false
		},
		{
			type: 'CLTR_BOB',
			name: '(CLOSED) Battle of Bands',
			INRcost: 2500,
			open: false
		},
		{
			type: 'CLTR_GRD',
			name: 'Group Dance',
			INRcost: 3000,
			open: false
		},
		{
			type: 'CLTR_FAS',
			name: '(CLOSED) Fashion Show',
			INRcost: 250, // change to 300 per person like esports
			open: true
		},

		{
			type: 'ESPORTS',
			name: 'Esports pass',
			INRcost: 150,
			open: false
		}
	];
	let isSubmitDisabled = true;

	const vpassarr2 = [];

	for (let p of passarray) {
		if (category == 'SPORTS') {
			if (p.type.startsWith('SPORT')) {
				vpassarr2.push(p);
			}
		}

		if (category == 'CULTURAL') {
			if (p.type.startsWith('CLTR') || p.type == 'SUP_PRO') {
				vpassarr2.push(p);
			}
		}

		if (category == 'ESPORTS') {
			if (p.type == 'ESPORTS') {
				vpassarr2.push(p);
			}
		}
	}

	let booktext = 'Details Needed';
	const upBkTxt = (amount = 0) => {
		if (amount == 0) {
			booktext = 'Details Needed';
		} else {
			booktext = 'Pay ₹' + amount;
		}
	};

	const dispatch = createEventDispatcher();
	const dispatch2 = createEventDispatcher();
</script>

<div
	class=" fixed top-0 left-0 z-[11] w-screen max-xs:w-[600px] h-screen flex items-center justify-center font-normal fadeinSlow"
>
	<div
		class=" bg-[#FE786F] relative p-2 border-[1px] border-white max-md:font-semibold text-center max-md:text-md z-[9] max-w-[20%] max-sm:max-w-[60%] max-xs:max-w-[80%] max-md:max-w-[40%] max-md:text-sm max-xl:max-w-[30%] max-md:my-[10%] overflow-hidden"
	>
		<div
			class="   text-center uppercase font-bold text-[#04022A] text-xs p-2 {category == 'ESPORTS' ||
			category == 'CULTURAL'
				? 'hidden'
				: ''} "
		>
			Bring your ID on event day.
			<!-- Shown for sports -->
		</div>
		<div
			class="   text-center uppercase font-bold text-[#04022A] text-xs p-2 {category == 'SPORTS' ||
			category == 'ESPORTS'
				? 'hidden'
				: ''} "
		>
			Participation for cultural events<br />requires a College ID.
			<br />The Standup Comedy show is<br />MAHE students only.
			<!-- Shown for cultural -->
		</div>
		<div
			class="   text-center uppercase font-bold text-[#04022A] text-xs p-2 {category != 'ESPORTS'
				? 'hidden'
				: ''} "
		>
			You can only register for ONE ESPORTS event,<br />Forms for team registrations<br />will be
			emailed to you soon.
			<!-- Shown for esports -->
		</div>

		<!--error boxes, hidden by default-->
		<div class=" text-red-500 font-bold w-full animate-bounce mt-2 hidden" bind:this={noPhNum}>
			Please enter your phone number
		</div>
		<div class=" text-red-500 font-bold w-full animate-bounce mt-2 hidden" bind:this={noEvent}>
			Please select an event
		</div>
		<div class=" text-red-500 font-bold w-full animate-bounce mt-2 hidden" bind:this={noTeamDeets}>
			Please enter your team's contact details
		</div>
		<!--inputs-->
		<div class=" text-white font-extralight">
			<div class=" px-4 sm:px-6">
				<input
					placeholder="Phone Number"
					pattern="\d*"
					class=" font-monster p-2 max-sm:text-sm placeholder:max-md:text-sm w-full bg-transparent outline-none duration-200 caret-[#ffffff5b] placeholder:text-white border-b-2"
					bind:value={phnum}
					type="text"
					maxlength="10"
				/>
				{#if category == 'SPORTS'}
					<select
						bind:value={gval}
						bind:this={gsel}
						class=" disabled:opacity-30 w-full bg-transparent mt-4 p-2 border-b-2 font-monster"
					>
						<option class=" bg-slate-700 text-opacity-70 font-poppins" disabled selected value=""
							>Select your gender</option
						>
						<option class=" bg-slate-700 font-poppins" value="M">Male</option>
						<option class=" bg-slate-700 font-poppins" value="F">Female</option>
					</select>
					<select
						bind:value={eventChosen}
						bind:this={selevbox}
						class=" disabled:opacity-30 w-full bg-transparent mt-4 p-2 border-b-2 font-monster"
					>
						<option
							bind:this={defevent}
							class=" bg-slate-700 text-sm font-poppins"
							selected
							disabled
							value="">Select an event</option
						>
						{#each vpassarr2 as pass, i}
							{#if pass.type.endsWith('_' + gval) || pass.type.endsWith('_ATH') || pass.type.endsWith('_CHS')}
								<option class=" bg-slate-700 text-xs font-poppins" value={pass.type}
									>{pass.name + ' - ₹' + pass.INRcost}</option
								>
							{/if}
						{/each}
					</select>
				{:else if category == 'CULTURAL'}
					<select
						bind:value={eventChosen}
						bind:this={selevbox2}
						disabled
						class=" disabled:opacity-30 w-full bg-transparent mt-4 p-2 border-b-2 placeholder:text-sm font-monster"
					>
						<option
							bind:this={defevent}
							class=" bg-slate-700 text-sm font-poppins"
							selected
							disabled
							value="">Select an event</option
						>
						{#each vpassarr2 as pass, i}
							<option class=" bg-slate-700 text-xs font-poppins" value={pass.type}
								>{pass.name + ' - ₹' + pass.INRcost}</option
							>
						{/each}
					</select>
				{/if}
			</div>
		</div>
		<div class="w-full text-center mt-4 font-bold uppercase text-xs px-3">
			Press anywhere outside<br /> to dismiss
		</div>
		<button
			class=" w-fit font-normal text-center bg-[#FFE500] p-2 text-md my-4 hover:scale-110 active:scale-95 disabled:opacity-50 opacity-100 disabled:scale-100 scale-105 transition-all duration-100"
			bind:this={sbbtn}
			on:click={sendDat}
		>
			<div class=" w-full text-center text-xl font-normal text-[04022A] font-monster">
				{booktext}
			</div>
		</button>
	</div>
	<button
		class=" pointer-events-auto fixed backdrop-blur-md top-0 left-0 h-screen w-screen cursor-pointer fadeinSlow"
		on:click={() => {
			dispatch('close', { details: 'close' });
		}}
	/>
</div>

<style>
	.fadeinSlow {
		animation-name: slowFadeIn;
		animation-duration: 250ms;
		animation-iteration-count: 1;
		animation-fill-mode: forward;
	}

	.bgstars {
		background-image: image();
	}

	@keyframes slowFadeIn {
		0% {
			transform: translateY(-50px);
			opacity: 0;
		}

		100% {
			transform: translateY(0px);
			opacity: 100%;
		}
	}

	input {
		caret-color: black;
		caret-shape: underscore;
	}
</style>
