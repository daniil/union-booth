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

<h1>{cohortTopic.topic.title}</h1>

<h2>Frequently Asked Questions</h2>

<h2>Resources</h2>
