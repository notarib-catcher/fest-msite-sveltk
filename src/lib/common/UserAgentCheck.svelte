<script>
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

    onMount( async() => {
        if(browser){
            if(navigator.userAgent.toLowerCase().includes("samsung")){
                alert("You seem to be using samsung internet browser.\n\nThis browser is known to manipulate colours on websites. This breaks things like QR codes that we generate for you.\n\nWE STRONGLY RECOMMEND SWITCHING TO CHROME or any other browser before continuing.")
            }
        }
    })
</script>