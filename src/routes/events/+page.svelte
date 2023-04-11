
<script>
// @ts-nocheck

	import EventTile from '$lib/common/EventTile.svelte';
import { each } from 'svelte/internal';

     export let data;
</script>

<div class=" flex flex-col p-20">
    <h1 class="text-6xl font-bold bg-gradient-to-tr  from-[#3BACC1] to-[#2D6DB1] ont-extrabold text-transparent bg-clip-text">
      Gold Events
    </h1>
      <div class="flex flex-row flex-wrap">
        {#each data.events as event}
        <EventTile data={event}/>
        {/each}
      </div>
</div>
