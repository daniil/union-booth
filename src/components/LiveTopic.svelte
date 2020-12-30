<script>
  import { onMount } from 'svelte';
  import { get } from '../utils/request';
  import Loading from './Loading.svelte';
  import TopicQuestions from './TopicQuestions.svelte';

  let topic;
  let loading = true;

  onMount(async () => {
    const res = await get('topics/live.json');
    loading = false;

    if (!res.error) {
      topic = res.data;
    }
  });
</script>

{#if loading}
  <Loading/>
{:else}
  {#if topic}
    <h1>{topic.title}</h1>
    <TopicQuestions id={topic.id}/>
  {:else}
    <p>No Live Topic currently 🤷🏽‍♀️</p>
  {/if}
{/if}


