<script>
  import { onMount } from 'svelte';
  import { get } from '../utils/request';

  let discourse;

  onMount(async () => {
    res = await get('discourse/live.json');

    if (!res.error) {
      discourse = res.data;
    }
  });
</script>

{#if discourse}
  <h1>{discourse.topic}</h1>
{:else}
  Loading...
{/if}
