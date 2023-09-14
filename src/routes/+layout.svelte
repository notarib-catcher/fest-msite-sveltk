<script>
    import "../app.css"
    import Navbar from "../lib/common/Navbar.svelte";
    import Banner from "../lib/home_pg/Banner.svelte";
    import { page } from '$app/stores';
    import LoginNotif from "../lib/common/LoginNotif.svelte";
    import LogoutNotif from "../lib/common/LogoutNotif.svelte";
	import CancelledNotif from "$lib/common/CancelledNotif.svelte";
	import Footer from "$lib/common/Footer.svelte";
	import Analytics from "$lib/common/Analytics.svelte";
    import Loader from "$lib/common/Loader.svelte";
    export let data;
</script>
<CancelledNotif />
<LoginNotif />
<LogoutNotif />
<Loader />
<div class=" font-poppins">
    <Navbar fcAllowed="{data.fcAllowed}"/>
</div>
<Analytics/>
{#if $page.url.pathname == "/"}
    <div id="banner-container" class=" z-1">
        <Banner />
    </div>
{/if}


<slot />

<Footer />
