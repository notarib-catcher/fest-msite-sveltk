<script>
    // @ts-ignore
    import NavbarButton from "./NavbarButton.svelte";
    import { page } from '$app/stores';
	import { browser } from "$app/environment";

 
    
    if(browser){
        let currentIndex = 0;
        let typed = true

        const helloarray = [
            "नमस्ते", "ನಮಸ್ಕಾರ", "வணக்கம்", "నమస్కరం", "こんにちは", "Hello"
            ]

   
        const type = async (word = "Hello") => {
            let typingDiv = document.getElementById("tappitytap")
            // @ts-ignore
            let current = typingDiv.innerText
            let arr = Array.from(current)
            if(typed){

                arr.pop()

                if(arr.length == 0){
                    // @ts-ignore
                    typingDiv.innerText = ""
                    typed = false
                    return
                }
                let newcontent = arr.toString().replaceAll(",","")
                // @ts-ignore
                typingDiv.innerText = newcontent
            }
            else{
                // @ts-ignore
                if(current.length >= helloarray[currentIndex].length){
                    typed = true
                    currentIndex = (currentIndex + 1) % helloarray.length;
                    await new Promise((resolve) => setTimeout(resolve, 2000)); 
                    return
                }
                // @ts-ignore
                arr.push(helloarray[currentIndex][current.length])
                // @ts-ignore
                typingDiv.innerText = arr.toString().replaceAll(",","")
            }
        
        }
        const start = async () => {
            
            await new Promise((resolve) => setTimeout(resolve, 2000));  

            while(true){
            await type()
            await new Promise((resolve) => setTimeout(resolve, 100));  
            }   
        }

        
        start()
    }

   // @ts-ignore
</script>


<div id="nav-container" class=" w-screen sticky top-0 z-10">
    
    <nav class=" w-full h-full bg-zinc-900  flex flex-row-reverse">
        <div class=" h-fit w-full px-4 my-auto order-1 font-extralight text-white align-middle text-xl flex-row flex">
            
            
            <div class=" my-auto h-5 whitespace-nowrap flex-nowrap">
                <div class=" grid grid-flow-col grid-rows-1">
                    <div id="tappitytap">Hello</div><div id="cursor" class=" loopOpacity font-bold mr-1 bg-clip-text text-transparent bg-gradient-to-b from-[#143E86] to-[#3BACC1]">|</div><div> {#if $page.data.session}{$page.data.session.user?.name}!{:else}, explorer!{/if}</div>
                </div>
                
                
            
                
            
            </div>
            
        </div>
        <NavbarButton name = "" navroute = "" isLogoutbtn = {true} />
        {#if $page.data.session}
        <NavbarButton name = "My pass" navroute = "/mypass" isLogoutbtn = {false}/>
        {/if}
        <NavbarButton name = "Book" navroute = "/book" isLogoutbtn = {false}/>
        <NavbarButton name = "Events" navroute = "/events" isLogoutbtn = {false}/>
        <NavbarButton name = "Solstice" navroute = "/" isLogoutbtn = {false}/>
        
    </nav>
</div>

<style>
    .loopOpacity{
        animation: opacityLoop 1s infinite ease-in-out;
        transform: translateY(-2px);
    }

    @keyframes opacityLoop{
        0%{
            opacity: 1;
        }
        50%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
</style>