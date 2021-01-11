<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { query } from 'svelte-apollo';
  import Loading from '../../components/Loading.svelte';
  import Topic from './_Topic.svelte';
  import { TOPICS } from '../topics/_queries';
  import parseError from '../../utils/parseError';

  const { session } = stores();
  const topics = query(TOPICS);

  $: $session.topicListRefresh, reloadTopics();

  function reloadTopics() {
    if ($session.topicListRefresh) {
      topics.refetch();
    }
  }

  onMount(async () => {
    reloadTopics();
  });
</script>

{#if $topics.loading}
  <Loading/>
{:else if $topics.error}
  <p>Error: {parseError($topics.error)}</p>
{:else if $topics.data && $topics.data.topics.length > 0}
  {#each $topics.data.topics as topic (topic.id)}
    <Topic
      details={topic}
      on:topic-updated={reloadTopics}
    />
  {/each}
{:else}
  <p>No topics currently 🙍🏼‍♂️</p>
{/if}