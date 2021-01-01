<script>
  import { get } from '../../utils/request';
  import { onMount } from 'svelte';
  import Loading from '../../components/Loading.svelte';
  import Topic from './_Topic.svelte';

  let topics = [];
  let loading = true;

  const fetchTopics = async () => {
    loading = true;
    const res = await get('/topics/list.json');
    loading = false;
    topics = res.data;
  }

  onMount(async () => {
    fetchTopics();
  });
</script>

{#if loading}
  <Loading/>
{:else}
  {#each topics as topic (topic.id)}
    <Topic
      details={topic}
      on:topic-updated={fetchTopics}
    />
  {/each}
{/if}