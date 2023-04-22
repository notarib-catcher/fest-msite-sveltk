<script>
  /**
   * Load markdown from any URL as a native Svelte component.
   */

  import SvelteMarkdown from "svelte-markdown";
  import { browser } from "$app/environment";

  export let url;

  let markdownSource = "";

  if (browser) {
    const request = new XMLHttpRequest();

    request.onload = () => {
      markdownSource = request.response;
    };

    request.open("GET", url);
    request.send();
  }
</script>

<SvelteMarkdown source={ markdownSource } />
