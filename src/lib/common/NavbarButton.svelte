<script>
    import { signIn, signOut} from '@auth/sveltekit/client';
    // @ts-ignore
    /**
	 * @type {string}
	 */
     export let name;
    // @ts-ignore
    /**
	 * @type {string | null | undefined}
	 */
     export let navroute;

      /**
	 * @type {boolean}
	 */
     export let isLogoutbtn;
    import { page } from '$app/stores';
   // @ts-ignore
    name = name ?? "-"

</script>

{#if isLogoutbtn}
<button type="button" class="text-white border-x-zinc-600 font-extralight  from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-clip-text hover:text-transparent hover:font-semibold bg-gradient-to-r active:font-semibold max-md:text-left active:text-transparent text-xl  duration-200 max-md:w-full" on:click={($page.data.session)?async ()=>{ await signOut({callbackUrl: "/?logout"})}:() => {signIn("google", {callbackUrl: window.location.href + (window.location.href.endsWith('/')?"" : "/") + "?loginSuccess"})}} data-sveltekit-preload-data><div class="px-16 max-lg:px-5 max-xl:px-10 py-2.5 max-md:text-left">{($page.data.session)?"Logout":"Login"}</div></button>
{:else}
    {#key $page.url.pathname}
        <button type="button" class="text-white border-x-zinc-600 font-extralight from-[#D283B8] via-[#995BBB] to-[#6738BE] bg-clip-text whitespace-nowrap hover:text-transparent active:font-semibold active:text-transparent hover:font-semibold text-xl bg-gradient-to-r  duration-200"  data-sveltekit-preload-data><a  href={navroute} class = ' h-full'><div class="px-16 max-lg:px-5 max-xl:px-10 py-2.5 max-md:text-left">{name}</div></a></button>
    {/key}
{/if}