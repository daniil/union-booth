<script>
  import { onMount } from 'svelte';
  import { get } from '../utils/request';
  import Loading from './Loading.svelte';
  import DiscourseQuestions from './DiscourseQuestions.svelte';

  let discourse;
  let loading = true;

  onMount(async () => {
    const res = await get('discourse/live.json');
    loading = false;

    if (!res.error) {
      discourse = res.data;
    }
  });
</script>

{#if loading}
  <Loading/>
{:else}
  {#if discourse}
    <h1>{discourse.topic}</h1>
    <DiscourseQuestions id={discourse.id}/>
  {:else}
    <p>No Live Discourse currently 🤷🏽‍♀️</p>
  {/if}
{/if}


