<script>
	import { browser } from "$app/environment";
    let ctext;

    if(browser){
        
        let currentIndex = 0;
        let currentCursor = 0;
        let typed = true
    const sentences = [
        "Waiting for TOTK to release",
        "Suzume is a good movie",
        "アニメ見すぎ",
        "Crap, I have a test tomorrow...",
        "Its 4am please send help",
        "How much coffe is too much?",
        "This is no ordinary fest",
            ]

            
   
        const type = async () => {
            if(typed){
                ctext = ctext.substr(0,ctext.length-1)
                if(ctext.length == 0){
                    typed = false
                    currentCursor = 0;
                    currentIndex = (currentIndex + 1)%sentences.length
                }
            }

            if(!typed){
                ctext += sentences[currentIndex][currentCursor]
                currentCursor++
                if(currentCursor == sentences[currentIndex].length){
                    typed = true
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                }
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
    
</script>

<div class=" mt-10 bg-gradient-to-tr  via-[#63cbd7] to-[#537ae3] from-[#5378dc] text-transparent bg-clip-text relative w-screen h-[50px] max-sm:h-[70px] grid grid-flow-col max-sm:grid-cols-2 grid-cols-3 grid-rows-1">
    <div id="footertappy" bind:innerText={ctext} contenteditable="false" class=" w-full text-left pl-4 sm:pt-2 select-text">
        Coding at 3am...    
    </div>
    <div class=" bg-gradient-to-tr  via-[#63cbd7] to-[#537ae3] from-[#5378dc] text-transparent bg-clip-text pt-2 w-full text-center max-sm:hidden">
        ©2023 The Solstice Team
    </div>
    <div class=" w-full text-center pt-2 bg-gradient-to-tr  via-[#63cbd7] to-[#537ae3] from-[#5378dc] text-transparent bg-clip-text flex justify-end ">
        <a href="https://linktr.ee/techsolstice" class=" w-full text-right underline pr-3 hover:font-bold ">Visit our linktree</a>
    </div>
</div>