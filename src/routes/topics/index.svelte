<svelte:head>
	<title>Union Booth :: All Topics</title>
</svelte:head>

<script context="module">
  import { TOPICS } from './_queries';

  export async function preload(_, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    if (!process.browser) {
      await session.apolloClient.query({ query: TOPICS });
    }
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import TopicListItem from '../../components/TopicListItem.svelte';

  const { session } = stores();

  let topics = $session.apolloClient.readQuery({ query: TOPICS }).topics;
</script>

<h1>All Topics</h1>

{#if topics.length > 0}
  {#each topics as topic (topic.id)}
    <TopicListItem details={topic}/>
  {/each}
{:else}
  <p>No topics currently 🙍🏼‍♂️</p>
{/if}