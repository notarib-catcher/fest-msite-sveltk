<script>
    import BG from "$lib/common/BGAnim.svelte"
	import { onMount } from "svelte";
    import { navigating } from "$app/stores";
    let count = 5 
    var intervalled = false
    var navigate = true
    $: if($navigating) onNavDisable();
    const onNavDisable = () => {
        navigate = false
    }
    onMount(()=>{
        count = 5
        navigate = true
        setTimeout(() => {
            if(navigate){
                window.location.replace("/")
            }
        }, 5000);

        if(!intervalled){
            setInterval(() => {
                count--;
            },1000)
            intervalled = true
        }
        
        
    })


</script>
<div class="fixed top-0 z-20 bg-[#18181b] h-screen w-screen flex items-center justify-center flex-col">
    <BG />
    <div class=" flex flex-col items-center justify-center">
        <svg class=" translate-x-1" viewBox="0 0 628 450" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class=" rotateinOnLoad1" d="M356.326 171.615L317.231 153.385C294.024 142.563 266.438 152.603 255.617 175.81L237.386 214.906C226.565 238.113 236.605 265.698 259.812 276.519L298.908 294.75C322.114 305.572 349.7 295.531 360.521 272.325L378.752 233.229C389.573 210.022 379.533 182.437 356.326 171.615Z" stroke="#3BACC1" stroke-opacity="0.75" stroke-width="9"/>
            <path class=" rotateinOnLoad2" d="M394.056 208.14L343.657 144.78C331.052 128.933 307.986 126.305 292.139 138.91L228.779 189.309C212.932 201.914 210.304 224.98 222.91 240.827L273.308 304.187C285.913 320.034 308.979 322.662 324.827 310.057L388.186 259.658C404.033 247.053 406.661 223.987 394.056 208.14Z" stroke="#AF6C99" stroke-opacity="0.75" stroke-width="9"/>
            <path class=" rotateinOnLoad3" d="M401.11 224.267L358.432 147.275C348.552 129.45 326.092 123.01 308.267 132.89L231.275 175.568C213.45 185.448 207.01 207.908 216.89 225.733L259.568 302.725C269.448 320.55 291.908 326.99 309.733 317.11L386.725 274.432C404.55 264.552 410.99 242.092 401.11 224.267Z" stroke="#143E86" stroke-opacity="0.75" stroke-width="9"/>
            <path class=" rotateinOnLoad4" d="M379.362 174.045L307.959 136.08C289.964 126.512 267.621 133.343 258.053 151.338L220.087 222.74C210.519 240.735 217.351 263.079 235.345 272.647L306.748 310.612C324.742 320.18 347.086 313.349 356.654 295.354L394.619 223.952C404.187 205.957 397.356 183.613 379.362 174.045Z" stroke="#6738BE" stroke-opacity="0.75" stroke-width="9"/>
            <path d="M14.1 287.4V254.4L112.2 114H161.1V250.8H187.5V287.4H161.1V330H119.1V287.4H14.1ZM121.8 159L60.3 250.8H121.8V159Z" fill="white"/>
            <path class=" -translate-x-5" d="M443.1 287.4V254.4L541.2 114H590.1V250.8H616.5V287.4H590.1V330H548.1V287.4H443.1ZM550.8 159L489.3 250.8H550.8V159Z" fill="white"/>
        </svg>
        <div class=" text-white font-poppins select-text text-xl max-md:text-xs px-8">
            一人で行くのは危険です！
このリダイレクトを取る
        </div>
        <div class="text-white font-poppins text-xl mt-4">
            Redirect in {count}<!-- second{count == 1? "":"s"} -->
        </div>
        
    </div>
    
</div>