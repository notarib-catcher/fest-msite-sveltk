<script>
    import { onMount } from 'svelte';
      
      /**
	 * @type {any}
	 */
       export let codeValue;
      // @ts-ignore
      export let squareSize; 
      
    let qrcode;
              
      onMount(() => {
  
          let script = document.createElement('script');
      script.src = "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"
      document.head.append(script);
      
          script.onload = function() {
  
              // @ts-ignore
              qrcode = new QRCode("qrcode", {
                  text: codeValue,
                // @ts-ignore
                width: squareSize,
          // @ts-ignore
          height: squareSize,
          colorDark : "#000000",
          colorLight : "#e6e6e6",
          // @ts-ignore
          correctLevel : QRCode.CorrectLevel.H
              });		
              
          };				
        
      });
  </script>
  

  <div id="qrcode"></div>
  