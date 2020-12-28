<script>
  import { get } from '../../utils/request';
  import { onMount } from 'svelte';
  import Loading from '../../components/Loading.svelte';
  import DiscourseTopic from './DiscoureTopic.svelte';

  let topics = [];
  let loading = true;

  const fetchTopics = async () => {
    loading = true;
    const res = await get('/discourse/list.json');
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
    <DiscourseTopic
      details={topic}
      on:topic-updated={fetchTopics}
    />
  {/each}
{/if}