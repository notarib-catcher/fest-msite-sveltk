<script>
	import { browser } from '$app/environment';
	import CableCar from '../../assets/cable_car_transparent.svg';
	import Surge from '../../assets/FALAKLOGO.svg';
	import { onDestroy, onMount } from 'svelte';
	let OriginX = 0;
	let OriginY = 0;
	let DestinationX = 0;
	let DestinationY = 0;
	let counter = 2;
	var Debounce = false;
  let currentY = 0;

  let pb1, pb2, pb3, tagline;
	//multidimensional array
	/**
	 * @type {number[][]}
	 */
	let arrPos = [];

	let lengthX = 0;
	let lengthY = 0;

	onMount(() => {

		let CD1=document.getElementById('Clickdiv1');
		let CD2=document.getElementById('Clickdiv2');

		const body = document.querySelector('body');
		body?.classList.add('onhp')
		const vmax = body?.clientWidth > body?.clientHeight ? body?.clientWidth : body?.clientHeight;

		console.log(body?.clientWidth, body?.clientHeight, vmax, body?.clientHeight, body?.clientWidth);

		const gallery = document.getElementById('Volcano');

		if(browser){
			pb1.classList.add('hidden')
			pb2.classList.add('hidden')
			pb3.classList.add('hidden')
		}

		

		
		OriginX = ((6 * vmax) / 750) * 190;
		OriginY = ((4 * vmax) / 500) * 141.5;
		DestinationX = ((6 * vmax) / 750) * 684;
		DestinationY = ((4 * vmax) / 500) * 266;
		lengthX = ((6 * vmax) / 750) * 496.5;
		lengthY = ((4 * vmax) / 500) * 126;
		for (let ttt = 3; ttt > 0; ttt--) {
			let PosX = OriginX + ((DestinationX - OriginX) / 3) * ttt;
			let PosY = OriginY + ((DestinationY - OriginY) / 3) * ttt - vmax / 4;

			arrPos.push([PosX, PosY]);
		}
		console.log(gallery);
		

		CD2.onclick = (e) => {

			if (Debounce) {
				return;
			}
			Debounce = true;
			
			if(counter >= 0){
				tagline.classList.add('hidden')
				pb1.classList.add('hidden')
				pb2.classList.add('hidden')
				pb3.classList.add('hidden')

			}
			

			if(counter == 2){
				pb3.classList.remove('hidden')
			}
			if(counter == 1){
				pb2.classList.remove('hidden')
			}
			if(counter == 0){
				pb1.classList.remove('hidden')
			}

			const body = document.querySelector('body');
			if (
				arrPos[counter][0] + body?.clientWidth > 6 * vmax ||
				arrPos[counter][1] + body?.clientHeight > 4 * vmax
			) {
				arrPos[counter][0] = arrPos[counter][0] - body?.clientWidth / 2;
				arrPos[counter][1] = arrPos[counter][1] - body?.clientHeight / 2;
			}

			


			gallery.animate(
				{
					transform: `translate(${-1 * arrPos[counter][0]}px, ${-1 * arrPos[counter][1]}px)`
				},
				{
					duration: 3000,
					fill: 'forwards',
					easing: 'ease'
				}
			);

	
			counter--;
			let Cablecar = document.getElementById('Cablecar');
			//animate cablecars with keframes
			Cablecar?.classList.add('animation' + (2 - counter));
			setTimeout(() => {
				Debounce = false;
			}, 3000);
		};

		// let SurgeLogo = document.getElementById("Surge");
		// SurgeLogo.addEventListener("wheel", e => {
		//   e.preventDefault();
		//   for(let i = 100; i > 10; i--){
		//     SurgeLogo.style.height=`${i} vh`;
		//   }
		//   });

		let surgeLogo = document.getElementById('surgeLogo');

		if (currentY == 0) {
			surgeLogo?.classList.remove('surgeLogoInactive');
			surgeLogo?.classList.add('surgeLogoActive');
		} else {
			surgeLogo?.classList.remove('surgeLogoActive');
			surgeLogo?.classList.add('surgeLogoInactive');
		}

		CD1.onclick = (e) => {
			tagline.classList.remove('hidden')
			CD1.hidden = true
			console.log(currentY);
			currentY = currentY == 1 ? 0 : 1;
			if (currentY == 1) {
				surgeLogo?.classList.add('surgeLogoInactive');
				surgeLogo?.classList.remove('surgeLogoActive');
				// gallery?.classList.add('zoomedInMountain');

				gallery.style.transform = `translate(${-1 * (OriginX - body?.clientWidth / 2)}px, ${
					-1 * (OriginY - body?.clientHeight / 2)
				}px)`;
			}
		};
	});

	onDestroy( ()=> {
		if(browser){
			const body = document.querySelector('body');
			body?.classList.remove('onhp')
		}
		
	})
</script>

<main>
	<div class=" z-[150] flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 z-[100] ">
		<div class="z-[105] h-[100lvh] w-[100lvw] top-0 left-0 fixed" id="Clickdiv1"></div>
		<div class="z-[104] pb-44 font-monster text-3xl hidden text-white" bind:this={tagline}>
			Ride the wave of energy
		</div>
		<div class="z-[104] h-[100lvh] w-[100lvw] top-0 left-0 fixed" id="Clickdiv2"></div>

		<!-- Popbox -->
		<div class="flex flex-col items-center justify-center h-fit p-5" bind:this={pb3}>
			<div class=" flex flex-col items-center justify-center h-fit max-md:bg-black max-md:bg-opacity-20 rounded-xl  max-w-[600px] p-5 ">
				<div class=" h-fit text-white text-opacity-70 text-4xl font-monster">
					SPORTS
				</div>
				<div class="h-fit mt-10 font-uni font-bold text-white text-center">
					Welcome to Falak, where sports take centre stage in our celebration of culture, creativity, and excellence. Our sports events are designed to ignite your competitive fire, offering a thrilling platform to showcase your athleticism and sportsmanship. 				</div>
				<div class="xl:w-[40%] w-[90%] md:w-[75%] lg:w-[50%] flex flex-row justify-end max-md:justify-center">
					<button class="relative z-[150] btn1 mt-10 p-2 font-uni font-bold bg-white text-blue-400 opacity-80">
						Check out the sports events
					</button>
				</div>
			</div>
		</div>	

		<!-- Popbox -->
		<div class="flex flex-col items-center justify-center h-fit p-5" bind:this={pb2}>
			<div class=" flex flex-col items-center justify-center h-fit max-md:bg-black max-md:bg-opacity-20 rounded-xl  max-w-[600px] p-5 ">
				<div class=" h-fit text-white text-opacity-70 text-4xl font-monster">
					CULTURAL
				</div>
				<div class="h-fit mt-10 font-uni font-bold text-white">
					At Falak, we believe that culture is the heartbeat of our festival, showcasing the richness of our diverse heritage through enchanting dances, gripping dramas, and soul-stirring music. But that's not all – we also fuel the spirit of competition with engaging debates, captivating painting contests, and mind-boggling quizzes.				</div>
				<div class="xl:w-[40%] w-[90%] md:w-[75%] lg:w-[50%] flex flex-row justify-end max-md:justify-center">
					<button class="relative z-[150] btn1 mt-10 p-2 font-uni font-bold bg-white text-blue-400 opacity-80">
						Check out the cultural events
					</button>
				</div>
			</div>
		</div>	

		<!-- Popbox -->
		<div class="flex flex-col items-center justify-center h-fit p-5" bind:this={pb1}>
			<div class=" flex flex-col items-center justify-center h-fit max-md:bg-black max-md:bg-opacity-20 rounded-xl  max-w-[600px] ">
				<div class=" h-fit text-white text-opacity-70 text-4xl font-monster mt-5">
					Find us
				</div>
				<div class="h-fit relative z-[150]  font-uni font-bold text-white">
					<iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4613.399303500147!2d77.58746683406315!3d13.125627330237217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae196682f2da33%3A0x358deab93bcf0b1f!2sMAHE-BLR!5e0!3m2!1sen!2sin!4v1682232657039!5m2!1sen!2sin" class=" w-[90vw] max-w-[600px] h-[70vh] max-md:h-[50vh]  p-5 rounded-lg overflow-hidden" style="" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
				</div>
				<div class="xl:w-[40%] w-[90%] md:w-[75%] lg:w-[50%] flex flex-row justify-end max-md:justify-center">
					<button class="relative z-[150] btn1  p-2 font-uni font-bold bg-white text-blue-400 opacity-80 mb-5" on:click={() => {window.location = "/events"}}>
						Explore the fest
					</button>
				</div>
			</div>
		</div>	
	</div>
	
	
	<div id="Volcano" class="VolcanoDuringAnims Volcano" style="transform: translate(${OriginX}px, ${OriginY}px);">
		<img
			id="Cablecar"
			src={CableCar}
			alt="Cable Car"
			style="-webkit-transform: scaleX(-1) rotate(13deg); transform: scaleX(-1) translateY(40px) rotate(12.5deg); offset-Path: path('M {OriginX} {OriginY} L {DestinationX} {DestinationY}');"
		/>
	</div>
	<div>
		<img src={Surge} alt="Surge Logo" class="surgeLogo" id="surgeLogo" />
	</div>
</main>
