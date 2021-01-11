<svelte:head>
	<title>Union Booth :: All Topics</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { query } from 'svelte-apollo';
  import Loading from '../../components/Loading.svelte';
  import TopicListItem from '../../components/TopicListItem.svelte';
  import { TOPICS } from './_queries';
  import parseError from '../../utils/parseError';

  const topics = query(TOPICS);

  onMount(async () => {
    topics.refetch();
  });
</script>

<h1>All Topics</h1>

{#if $topics.loading}
  <Loading/>
{:else if $topics.error}
  <p>Error: {parseError($topics.error)}</p>
{:else if $topics.data && $topics.data.topics.length > 0}
  {#each $topics.data.topics as topic (topic.id)}
    <TopicListItem details={topic}/>
  {/each}
{:else}
  <p>No topics currently 🙍🏼‍♂️</p>
{/if}