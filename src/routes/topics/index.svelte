<svelte:head>
	<title>Union Booth :: All Topics</title>
</svelte:head>

<script context="module">
  import { UNLOCKED_TOPICS } from 'graphql/queries/cohort-topic';

  export async function preload(_, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    try {
      await session.apolloClient.query({ query: UNLOCKED_TOPICS });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import TopicListItem from 'components/topics/TopicListItem.svelte';

  const { session } = stores();

  let unlockedTopics = $session.apolloClient.readQuery({ query: UNLOCKED_TOPICS }).unlockedTopics;

  const unlockedTopicsSub = $session.apolloClient
    .watchQuery({
      query: UNLOCKED_TOPICS,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      unlockedTopics = data.unlockedTopics;
    });

  onDestroy(() => unlockedTopicsSub.unsubscribe());
</script>

<style>
  p {
    padding: 1rem 0 2rem;
    text-align: center;
    color: #7D6D61;
  }
</style>

<h1>All Topics</h1>

{#if unlockedTopics.length > 0}
  {#each unlockedTopics as unlockedTopic (unlockedTopic.topic.id)}
    <TopicListItem details={unlockedTopic}/>
  {/each}
{:else}
  <p>No topics currently 🙍🏼‍♂️</p>
{/if}