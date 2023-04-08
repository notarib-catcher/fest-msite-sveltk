<script>
    import "../app.css"
    import Navbar from "../lib/common/Navbar.svelte";
    import { page } from '$app/stores';
</script>
{#if $page.url.pathname == "/"}
    <div id="banner-container">
        Big ass pass on home page here
    </div>
{/if}
<Navbar />
<slot />