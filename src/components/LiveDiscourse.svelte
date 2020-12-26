<script>
  import { onMount } from 'svelte';
  import { get } from '../utils/request';

  let discourse;
  let loading = true;

  onMount(async () => {
    res = await get('discourse/live.json');
    loading = false;

    if (!res.error) {
      discourse = res.data;
    }
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  {#if discourse}
    <h1>{discourse.topic}</h1>
  {:else}
    <p>No Live Discourse currently 🤷🏽‍♀️</p>
  {/if}
{/if}


