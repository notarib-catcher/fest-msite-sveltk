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
	import { goto } from '$app/navigation';
   // @ts-ignore
     $: disabled = $page.url.pathname.endsWith(navroute)?true:false
    name = name ?? "-"

</script>

{#if isLogoutbtn}
<button type="button" class="  border-l-2 text-white border-x-zinc-600 font-extralight hover:text-fuchsia-500 duration-200" on:click={($page.data.session)?async ()=>{ await signOut({callbackUrl: "/"})}:() => {signIn("google")}} data-sveltekit-preload-data><div class="px-6 py-2.5">{($page.data.session)?"Logout":"Login"}</div></button>
{:else}
    {#key $page.url.pathname}
        <button type="button" class="  border-l-2 text-white whitespace-nowrap border-x-zinc-600 font-extralight hover:text-fuchsia-500 duration-200" disabled={disabled} data-sveltekit-preload-data><a  href={(disabled)?"":navroute} class = ' h-full'><div class="px-6 py-2.5">{name}</div></a></button>
    {/key}
{/if}