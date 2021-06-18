<svelte:head>
	<title>Union Booth :: Live: {liveTopic ? liveTopic.topic.title : 'Loading'}</title>
</svelte:head>

<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { LIVE_TOPIC } from 'graphql/queries/cohort-topic';
  import Loading from 'components/Loading.svelte';
  import TopicQuestions from 'components/TopicQuestions.svelte';

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

<style>
  h1 {
    margin-bottom: 2rem;
  }
</style>

{#if loading}
  <Loading/>
{:else}
  {#if liveTopic}
    <h1>{liveTopic.topic.title}</h1>
    <TopicQuestions {liveTopic}/>
  {:else}
    <p>No Live Topic currently 🤷🏽‍♀️</p>
  {/if}
{/if}


