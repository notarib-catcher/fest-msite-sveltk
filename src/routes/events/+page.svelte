
<script>
// @ts-nocheck

	import EventTile from '$lib/events_pg/EventTile.svelte';
import { each } from 'svelte/internal';

     export let data;
</script>

<div class=" flex flex-col p-20">
    <h1 class="text-6xl font-bold bg-gradient-to-tr  from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent w-fit bg-clip-text">
      Gold Events
    </h1>
      <div class="flex flex-row flex-wrap justify-center">
        {#each data.events as event}
        <EventTile data={event}/>
        {/each}
      </div>
</div>
