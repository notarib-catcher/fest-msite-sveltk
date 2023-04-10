<script>
    import "../app.css"
    import Navbar from "../lib/common/Navbar.svelte";
    import Banner from "../lib/home_pg/Banner.svelte";
    import { page } from '$app/stores';
    import LoginNotif from "../lib/common/LoginNotif.svelte";
    import LogoutNotif from "../lib/common/LogoutNotif.svelte";
	import CancelledNotif from "$lib/common/CancelledNotif.svelte";
</script>
<LoginNotif />
<LogoutNotif />
<CancelledNotif />

{#if $page.url.pathname == "/"}
    <div id="banner-container" class=" z-1">
        <Banner />
    </div>
{/if}
<div>
    <Navbar />
</div>

<slot />