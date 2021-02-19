<svelte:head>
	<title>Union Booth :: Live: {cohortTopic ? cohortTopic.topic.title : 'Loading'}</title>
</svelte:head>

<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { LIVE } from 'graphql/queries/cohort-topic';
  import Loading from 'components/Loading.svelte';

  const { session } = stores();

  let cohortTopic;
  let loading = true;

  const liveTopicSub = $session.apolloClient
    .watchQuery({
      query: LIVE,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      if (!data) return;
      cohortTopic = data.live;
      loading = false;
    });

  onDestroy(() => liveTopicSub.unsubscribe());
</script>

{#if loading}
  <Loading/>
{:else}
  {#if cohortTopic}
    <h1>{cohortTopic.topic.title}</h1>
  {:else}
    <p>No Live Topic currently 🤷🏽‍♀️</p>
  {/if}
{/if}


