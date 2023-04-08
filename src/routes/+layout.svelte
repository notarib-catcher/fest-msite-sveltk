<script>
    import "../app.css"
    import Navbar from "../lib/common/Navbar.svelte";
    import Banner from "../lib/home_pg/Banner.svelte";
    import { page } from '$app/stores';
</script>
{#if $page.url.pathname == "/"}
    <div id="banner-container">
        <Banner />
    </div>
{/if}
<Navbar />
<slot />