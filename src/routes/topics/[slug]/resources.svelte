<svelte:head>
	<title>Union Booth :: Topic: {topicResources.topic ? topicResources.topic.title : 'Loading'} - Resources</title>
</svelte:head>

<script context="module">
  import { TOPIC_RESOURCES } from 'graphql/queries/topic-resources';

  export async function preload(page, session) {
    await session.apolloClient.query({
      query: TOPIC_RESOURCES,
      variables: { slug: page.params.slug }
    });

    return {
      slug: page.params.slug
    }
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
	import TopicResources from 'components/topics/TopicResources.svelte';

  export let slug;

  const { session } = stores();

  let topicResources = $session.apolloClient.readQuery({
    query: TOPIC_RESOURCES,
    variables: { slug }
  }).topicResources;

  const topicResourcesSub = $session.apolloClient
    .watchQuery({
      query: TOPIC_RESOURCES,
      variables: { slug },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      topicResources = data.topicResources;
    });
  
  onDestroy(() => topicResourcesSub.unsubscribe());
</script>

<TopicResources topic={topicResources}/>