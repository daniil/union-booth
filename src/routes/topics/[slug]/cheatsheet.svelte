<svelte:head>
	<title>Union Booth :: Topic: {topic.topic ? topic.topic.title : 'Loading'} - Cheatsheet</title>
</svelte:head>

<script context="module">
  import { TOPIC } from 'graphql/queries/cohort-topic';

  export async function preload(page, session) {
    await session.apolloClient.query({
      query: TOPIC,
      variables: { slug: page.params.slug }
    });

    return {
      slug: page.params.slug
    };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  
  import { parseMD } from 'utils/markdown';

  export let slug;

  const { session } = stores();

  let topic = $session.apolloClient.readQuery({
    query: TOPIC,
    variables: { slug }
  }).topic

  const topicSub = $session.apolloClient
    .watchQuery({
      query: TOPIC,
      variables: { slug },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      topic = data.topic;
    });
  
  onDestroy(() => topicSub.unsubscribe());
</script>

<style lang="scss">
  h3 {
    font-size: 1rem;
    line-height: 1.5;
    @media (min-width: 48rem) {
      font-size: 1.17rem;
    }
  }
  p {
    padding: 1rem 0 2rem;
    text-align: center;
    color: #7D6D61;
  }
</style>

{#if topic.topic.cheatsheet}
  <h3>{@html parseMD(topic.topic.cheatsheet)}</h3>
{:else}
  <p>No Cheatsheet currently 🪴</p>
{/if}