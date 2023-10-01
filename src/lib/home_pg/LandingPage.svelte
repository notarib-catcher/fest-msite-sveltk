<script>
    import CableCar from '../../assets/cable_car_transparent.svg'
    import Surge from '../../assets/FALAKLOGO.svg'
    import { onDestroy, onMount } from 'svelte';
    let OriginX = 0;
      let OriginY = 0;
      let DestinationX = 0;
      let DestinationY = 0;
      let counter = 2;
      var Debounce =false;
      //multidimensional array
    let arrPos = [];

      let lengthX = 0;
    let lengthY = 0;
   
    onMount(() => {
      const body=document.querySelector("body");
        const vmax= body?.clientWidth > body?.clientHeight ? body?.clientWidth :body?.clientHeight ;
        
        console.log(body?.clientWidth, body?.clientHeight, vmax,body?.clientHeight,body?.clientWidth);

        
      const gallery = document.getElementById("Volcano");
     
        OriginX = (6*vmax/750)*190;
        OriginY = (4*vmax/500)*141.5;
        DestinationX = (6*vmax/750)*684;
        DestinationY = (4*vmax/500)*266;
        lengthX = (6*vmax/750)*496.5;
        lengthY = (4*vmax/500)*126;
        for(let ttt=3; ttt>0; ttt--){
            let PosX=OriginX+((DestinationX-OriginX)/3)*ttt;
            let PosY=OriginY+((DestinationY-OriginY)/3)*ttt-vmax/3;
            
          arrPos.push([PosX,PosY]);
        }
      gallery.innerHTML+= `<img id="Cablecar" src=${CableCar} alt="Cable Car" style="-webkit-transform: scaleX(-1) rotate(13deg); transform: scaleX(-1) translateY(40px) rotate(12.5deg); offset-Path: path('M ${OriginX} ${OriginY} L ${DestinationX} ${DestinationY}');"/>`;
    console.log(gallery);
    gallery.style.transform=`translate(${-1*(OriginX-body?.clientWidth/2)}px, ${-1*(OriginY-body?.clientHeight/2)}px)`;
    
    gallery.onclick = e => {
        if(Debounce){
            return;
        }
        Debounce=true;
        const body=document.querySelector("body");
            if(arrPos[counter][0]+body?.clientWidth > 6*vmax || arrPos[counter][1]+ body?.clientHeight > 4*vmax){
                arrPos[counter][0] = arrPos[counter][0] -body?.clientWidth/2;
                arrPos[counter][1] = arrPos[counter][1] -body?.clientHeight/2;
            }
            console.log(1);
            
          gallery.animate({
            transform: `translate(${-1*arrPos[counter][0]}px, ${-1*arrPos[counter][1]}px)`
          }, {
            duration: 3000,
            fill: "forwards",
            easing: "ease"
          })
          console.log(2);
          counter--;
          let Cablecar = document.getElementById("Cablecar");
          //animate cablecars with keframes
            Cablecar?.classList.add("animation"+(2-counter));
            setTimeout(() => {
                Debounce=false;
            }, 3000);
    
  }
 
  // let SurgeLogo = document.getElementById("Surge");
  // SurgeLogo.addEventListener("wheel", e => {
  //   e.preventDefault();
  //   for(let i = 100; i > 10; i--){
  //     SurgeLogo.style.height=`${i} vh`;
  //   }
  //   });
    function TraveltoSports(){
        let gallery=document.getElementById("Volcano");
        gallery.animate({
            transform: `translate(${-1*arrPos[2][0]}px, ${-1*arrPos[2][1]}px)`
          }, {
            duration: 500,
            fill: "forwards",
            // easing: "ease"
          })
    }
    });
  </script>
  
  <main>
      <div id="Volcano" style="transform: translate(${OriginX}px, ${OriginY}px);">
      </div>
      <!-- <div id="Surge">
        <img src={Surge} alt="Surge Logo" />
      </div> -->
  </main>
  
  