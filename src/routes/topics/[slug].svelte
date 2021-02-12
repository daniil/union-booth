<svelte:head>
	<title>Union Booth :: Topic: {cohortTopic.topic ? cohortTopic.topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { TOPIC } from 'graphql/queries/cohort-topic';

  export async function preload(page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

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

  export let slug;

  const { session } = stores();

  let cohortTopic = $session.apolloClient.readQuery({
    query: TOPIC,
    variables: { slug }
  }).topic;
</script>

<style>
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .live {
    background-color: rgb(212, 224, 155);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    color: white;
    text-shadow: 0px 1px 0 rgb(0 0 0 / 30%);
    font-size: 1.25rem;
  }
</style>

<div class="title-wrapper">
  <h1>{cohortTopic.topic.title}</h1>
  {#if cohortTopic.isLive}
    <div class="live">LIVE</div>
  {/if}
</div>

<h2>Frequently Asked Questions</h2>

<h2>Resources</h2>
