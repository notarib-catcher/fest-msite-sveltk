<script>
    import CableCar from '../../assets/cable_car_transparent.svg'
    import Surge from '../../assets/FALAKLOGO.svg'
    import { onMount } from 'svelte';
    let OriginX = 0;
      let OriginY = 0;
      let DestinationX = 0;
      let DestinationY = 0;
    
    onMount(() => {
      const gallery = document.getElementById("Volcano");
     
      if(window.innerWidth > window.innerHeight){
        OriginX = (6*window.innerWidth/750)*187.5;
        OriginY = (4*window.innerWidth/500)*140;
        DestinationX = (6*window.innerWidth/750)*684;
        DestinationY = (4*window.innerWidth/500)*266;
      }else{
      OriginY = (6*window.innerWidth/750)*187.5;
      OriginX = (4*window.innerHeight/500)*140;
      }
      console.log(OriginX);
      console.log(OriginY);
      console.log(DestinationX);
      console.log(DestinationY);
      gallery.innerHTML+= `<img id="Cablecar" src=${CableCar} alt="Cable Car" style="offset-Path: path('M ${OriginX} ${OriginY} L ${DestinationX} ${DestinationY}');"/>`;
    console.log(gallery);
    gallery.style.transform=`translate(${-1*(OriginX-window.innerWidth/2)}px, ${-1*(OriginY-window.innerHeight/2)}px)`;
    
    window.onclick = e => {
    const mouseX = e.clientX,
          mouseY = e.clientY;
    
    const xDecimal = mouseX / window.innerWidth,
          yDecimal = mouseY / window.innerHeight;
    
    const maxX = gallery.offsetWidth - window.innerWidth,
          maxY = gallery.offsetHeight - window.innerHeight;
    
    const panX = maxX * xDecimal * -1,
          panY = maxY * yDecimal * -1;
    
    gallery.animate({
      transform: `translate(${panX}px, ${panY}px)`
    }, {
      duration: 4000,
      fill: "forwards",
      easing: "ease"
    })
  }
  // let SurgeLogo = document.getElementById("Surge");
  // SurgeLogo.addEventListener("wheel", e => {
  //   e.preventDefault();
  //   for(let i = 100; i > 10; i--){
  //     SurgeLogo.style.height=`${i} vh`;
  //   }
  //   });
    });
    
  </script>
  
  <main>
      <div id="Volcano" style="transform: translate(${OriginX}px, ${OriginY}px);">
      </div>
      <!-- <div id="Surge">
        <img src={Surge} alt="Surge Logo" />
      </div> -->
  </main>
  
  