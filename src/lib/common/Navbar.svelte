<script>
    // @ts-ignore
    import NavbarButton from "./NavbarButton.svelte";
    import { page } from '$app/stores';
    import logo from "../../assets/logo.png"
   // @ts-ignore
</script>


<div id="nav-container" class=" w-screen sticky top-0">
    
    <nav class=" w-full h-full bg-zinc-800  flex flex-row-reverse">
        <div class=" h-fit w-full px-4 my-auto order-1 font-extralight text-white align-middle text-xl flex-row flex">
            <div class="border-r-2 border-x-zinc-600 mr-5 h-full">
                <img src = {logo} alt = "logo" class=" h-10 mr-6 my-2  ">
            </div>
            
            <div class=" my-auto">
                {#if $page.data.session}
                Hello, {$page.data.session.user?.name}!
            {:else}
                Hello, explorer!
            {/if}
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