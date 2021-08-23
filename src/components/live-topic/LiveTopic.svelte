<svelte:head>
	<title>Union Booth :: Live: {liveTopic ? liveTopic.topic.title : 'Loading'}</title>
</svelte:head>

<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { LIVE_TOPIC } from 'graphql/queries/cohort-topic';
  import Loading from 'components/shared/Loading.svelte';
  import TopicQuestions from 'components/live-questions/TopicQuestions.svelte';

  const { session } = stores();

  let liveTopic;
  let loading = true;

  const liveTopicSub = $session.apolloClient
    .watchQuery({
      query: LIVE_TOPIC,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      if (!data) return;
      liveTopic = data.liveTopic;
      loading = false;
    });

  onDestroy(() => liveTopicSub.unsubscribe());
</script>

<style lang="scss">
  .container {
    padding: 0 1rem;
    @media (min-width: 48rem) {
      padding: 0;
    }
  }
  h1 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    @media (min-width: 48rem) {
      font-size: 2rem;
    }
  }
  .no-topic {
    padding: 1rem 0 2rem;
    text-align: center;
    color: #7D6D61;
    font-size: 1.1rem;
  }
  .review {
    text-align: center;
    color: #7D6D61;
    font-size: 0.85rem;
  }
</style>

{#if loading}
  <Loading/>
{:else}
  <div class="container">
    {#if liveTopic}
      <h1>{liveTopic.topic.title}</h1>
      <TopicQuestions {liveTopic}/>
    {:else}
      <p class="no-topic">No Live Topic currently 🤷🏽‍♀️.</p>
      <p class="review">You can review <a rel="prefetch" href="/topics">previous topics</a> meanwhile.</p>
    {/if}
  </div>
{/if}


