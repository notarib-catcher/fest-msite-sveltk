<script>
    // @ts-ignore
    import NavbarButton from "./NavbarButton.svelte";
    import { page } from '$app/stores';

   // @ts-ignore
</script>


<div id="nav-container" class=" w-screen sticky top-0 z-10">
    
    <nav class=" w-full h-full bg-zinc-900  flex flex-row-reverse">
        <div class=" h-fit w-full px-4 my-auto order-1 font-extralight text-white align-middle text-xl flex-row flex">
            
            
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