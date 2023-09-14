<script>


    // @ts-ignore
    export let fcAllowed = false;
    let menu
    let menubackdrop

    const closeMenu = async () => {
        menu.classList.remove("menumoveinleft")
        menubackdrop.classList.remove("blurinmenubkd")
        menu.classList.add("menumoveoutleft")
        menubackdrop.classList.add("bluroutmenubkd")
        setTimeout(() => {
            menu.hidden = true
            menubackdrop.hidden = true
            menu.classList.add("menumoveinleft")
            menubackdrop.classList.add("blurinmenubkd")
            menubackdrop.classList.remove("bluroutmenubkd")
            menu.classList.remove("menumoveoutleft")
        },270)
    }

    const openMenu = async () => {
        menu.hidden = false
        menubackdrop.hidden = false
    }

    // $: if($navigating) onCloseMenu();

    

   // @ts-ignore
</script>





<!--Navbox new-->

<div bind:this={menu} class="menumoveoutleft fixed bg-opacity-30 text-white font-yatra top-0 left-0 h-[100dvh] md:w-[30%] w-[50%] bg-black z-50">
    <button on:click={closeMenu} class=" relative top-0 w-full h-[100px] bg-white">

    </button>

    <div class="absolute bottom-5 w-full h-[100px] bg-white">

    </div>
</div>
<div bind:this={menubackdrop} class="bluroutmenubkd fixed z-[49] h-[100lvh] w-[100lvw] backdrop-blur-md">

</div>

<!--End navbox-->

<style>
  
</style>