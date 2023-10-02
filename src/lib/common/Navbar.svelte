<script>
    import surgelogo from "../../assets/SURGEnoFlksmall.webp"
    import team from "../../assets/people-group-solid.svg"
    import hamburger from "../../assets/hamburger-md-svgrepo-com.svg"
    import burgerFood from "../../assets/burger-solid.svg"
    import ticketIcon from "../../assets/ticket-solid.svg"
    import cartIcon from "../../assets/cart-shopping-solid.svg"
    import calendarIcon from "../../assets/calendar-days-solid.svg"
    
    import NavbarButton from "./NavbarButton.svelte";
    
    import closebtn from "../../assets/circle-xmark-regular.svg"

    import { navigating } from "$app/stores";
	import { page } from '$app/stores';



    // @ts-ignore
    export let fcAllowed;
    let menu
    let menubackdrop
    let menubtn

    const closeMenu = async () => {
        menubtn.hidden=false
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
        menu.classList.add("menumoveinleft")
        menubackdrop.classList.add("blurinmenubkd")
        menubackdrop.classList.remove("bluroutmenubkd")
        menu.classList.remove("menumoveoutleft")
        menu.hidden = false
        menubackdrop.hidden = false
        menubtn.hidden = true
    }

    $: if($navigating) closeMenu();

    

   // @ts-ignore
</script>





<!--Navbox new-->
<button class="z-[500] fixed top-0 left-0" on:click={openMenu} bind:this={menubtn}>
    <img src={hamburger} width="50px">
</button>
<div bind:this={menu} class="menumoveoutleft fixed bg-opacity-30 text-white top-0 left-0 h-[100dvh] md:w-[35%] lg:w-[25%] w-[100%] bg-black z-[500]" hidden>
    <button class="ml-4 absolute right-0 top-0 mt-2 mr-2 p-1 rounded-full bg-black bg-opacity-30 active:bg-white active:bg-opacity-25 transition-all duration-150" on:click={closeMenu}>
        <img src={closebtn} width="30px">
    </button>
    <div class=" w-full h-full flex items-center justify-center">
        <div class=" gap-5 grid grid-cols-2 grid-rows-4">
            {#if !$page.data.session?.user}
                <NavbarButton isLogoutbtn />
            {/if}
            <NavbarButton name="Home" navroute="/" image={surgelogo}/>
            <!-- <NavbarButton name="The Team" navroute="/team" image={team}/> -->
            <NavbarButton name="Events" navroute="/events" image={calendarIcon}/>
            <NavbarButton name="Get a pass" navroute="/book" image={cartIcon}/>
            {#if $page.data.session?.user}
                <NavbarButton name="My passes" navroute="/mypass" image={ticketIcon}/>
                <NavbarButton isLogoutbtn />
            {/if}
            {#if fcAllowed}
                <NavbarButton name="Buy food" navroute="/fc/gen" image={burgerFood}/>
            {/if}
        </div>
    </div>
</div>
<button on:click={closeMenu} bind:this={menubackdrop} class="bluroutmenubkd fixed z-[499] top-0 h-[100lvh] w-[100lvw] backdrop-blur-md cursor-default" hidden>

</button>

<!--End navbox-->

<style>
  
</style>