<svelte:head>
	<title>Union Booth :: Live: {liveTopic ? liveTopic.topic.title : 'Loading'}</title>
</svelte:head>

<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { LIVE } from 'graphql/queries/cohort-topic';
  import Loading from 'components/Loading.svelte';
  import TopicQuestions from 'components/TopicQuestions.svelte';

  const { session } = stores();

  let liveTopic;
  let loading = true;

  const liveTopicSub = $session.apolloClient
    .watchQuery({
      query: LIVE,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      if (!data) return;
      liveTopic = data.live;
      loading = false;
    });

  onDestroy(() => liveTopicSub.unsubscribe());
</script>

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


