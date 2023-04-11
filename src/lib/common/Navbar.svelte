<script>
    // @ts-ignore
    import NavbarButton from "./NavbarButton.svelte";
    import { page } from '$app/stores';
	import { browser } from "$app/environment";
    import leftarrow from "../../assets/left-svgrepo-com.svg"
    import hamburger from "../../assets/hamburger-md-svgrepo-com.svg"

 
    

        const onOpenMenu = async () => {
            
            // @ts-ignore
      
            // @ts-ignore
            document.getElementById("nav").className = document.getElementById("nav").className.replaceAll("max-md:hidden", " ")
            // @ts-ignore
            // @ts-ignore
            document.getElementById("nav").className = document.getElementById("nav").className.replaceAll("hide", " ")
            
            // @ts-ignore
            document.getElementById("nav").className = document.getElementById("nav").className + " show "

            // @ts-ignore
            document.getElementById("coverall").className = document.getElementById("coverall").className.replaceAll("max-md:hidden", " ")
           

        }
        const onCloseMenu = async () => {
            
    
            // @ts-ignore

            document.getElementById("nav").className = document.getElementById("nav").className.replace("show", " ")
            // @ts-ignore
            document.getElementById("nav").className = document.getElementById("nav").className + " hide"
            // @ts-ignore


            
            
            // @ts-ignore
            setTimeout(()=>{
                // @ts-ignore
                document.getElementById("nav").className = document.getElementById("nav").className + " max-md:hidden "
                
                
                // @ts-ignore
                document.getElementById("coverall").className = document.getElementById("coverall").className  + " max-md:hidden"
                
                
            }, 500)
            
        }
    if(browser){

        window.addEventListener('resize', async () => {
            if(window.innerWidth > 768){
                // @ts-ignore
                document.getElementById("nav").className = document.getElementById("nav")?.className.replaceAll("hide", " ")
            }
        })

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


<div id="nav-container" class=" w-screen md:sticky max-md:fixed max-md:top-0 z-10">
    <div class=" md:hidden opacity-25">
        <button on:click={ onOpenMenu }>
            <img class=" h-10 w-10 fadeIn" src={hamburger} alt="open menu">
        </button>
    </div>
    <div id="coverall" class=" fadeIn max-md:hide max-md:h-screen max-md:w-screen max-md:fixed z-[8] max-md:backdrop-blur-md max-md:top-0 max-md:left-0 md:pointer-events-none max-md:fadeIn max-md:hidden overflow-y-hidden">
    
        <nav id="nav" class="md:shadow-lg pointer-events-auto   max-md:hidden md:w-full md:h-full bg-zinc-900  flex md:flex-row-reverse flex-col left-0 h-screen max-md:fixed  relative max-md:min-w-[40%] max-md:w-fit  max-w-full">
            <div class=" h-fit w-full px-4 my-auto order-1 font-light text-white align-middle text-xl flex-row flex">
                
                
                <div class=" my-auto h-5 whitespace-nowrap flex-nowrap">
                    <div class=" grid md:grid-flow-col md:grid-rows-1 grid-flow-row grid-cols-1">
                        
                        {#if $page.data.session}<div class=" md:hidden">Welcome,</div>{/if}
                        <div class=" grid grid-flow-col grid-rows-1">
                            <div id="tappitytap" class=" max-md:hidden">Hello</div><div id="cursor" class=" loopOpacity font-bold mr-1 max-md:hidden  bg-clip-text text-transparent bg-gradient-to-b from-[#143E86] to-[#3BACC1]">|</div>
                        </div>
                        <div class=" grid grid-flow-col grid-rows-1 bg-gradient-to-tr font-semibold via-[#D283B8] to-[#6738BE] from-[#6738BE] bg-clip-text whitespace-nowrap text-transparent backgroundpan"> {#if $page.data.session}{$page.data.session.user?.name?.split(" ")[0]}{:else}<div class="max-md:hidden bg-gradient-to-tr font-semibold from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-clip-text whitespace-nowrap text-transparent">explorer</div>{/if}<div class=" max-md:hidden">!</div></div>
                    </div>
                    
                    
                
                    
                
                </div>
                
            </div>
            <div><button class=" text-white md:hidden w-full text-left pl-4 text-2xl font-semibold mb-4 mt-4" on:click={onCloseMenu}>
                <img src={leftarrow} class=" w-10 h-10" alt="close" />
            </button></div>
            <div class=" max-md:order-5">
                <NavbarButton name = "" navroute = "" isLogoutbtn = {true} />
            </div>
            <div class="md:hidden">
                <NavbarButton name = "Solstice" navroute = "/" isLogoutbtn = {false}/>
            </div>
            
            <div class="md:hidden">
                <NavbarButton name = "Events" navroute = "/events" isLogoutbtn = {false}/>
            </div>
            {#if $page.data.session}
            <NavbarButton name = "My pass" navroute = "/mypass" isLogoutbtn = {false}/>
            {/if}

            <NavbarButton name = "Book" navroute = "/book" isLogoutbtn = {false}/>
            <div class="max-md:hidden">
                <NavbarButton name = "Events" navroute = "/events" isLogoutbtn = {false}/>
            </div>
            
            <div class="max-md:hidden">
                <NavbarButton name = "Solstice" navroute = "/" isLogoutbtn = {false}/>
            </div>
            
        </nav>
    </div>
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


   

    .fadeIn{
        animation: fadeInAnim 1s forwards ease;
    }

    



    @keyframes fadeInAnim{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 100%;
        } 
    }

</style>