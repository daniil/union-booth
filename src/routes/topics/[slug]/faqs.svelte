<svelte:head>
	<title>Union Booth :: Topic: {topicFAQ.topic ? topicFAQ.topic.title : 'Loading'} - FAQs</title>
</svelte:head>

<script context="module">
  import { TOPIC_FAQ } from 'graphql/queries/topic-faq';

  export async function preload(page, session) {
    await session.apolloClient.query({
      query: TOPIC_FAQ,
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
	import TopicFAQ from 'components/TopicFAQ.svelte';

  export let slug;

  const { session } = stores();

  let topicFAQ = $session.apolloClient.readQuery({
    query: TOPIC_FAQ,
    variables: { slug }
  }).topicFAQ;

  const topicFAQSub = $session.apolloClient
    .watchQuery({
      query: TOPIC_FAQ,
      variables: { slug },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      topicFAQ = data.topicFAQ;
    });
  
  onDestroy(() => topicFAQSub.unsubscribe());
</script>

<TopicFAQ topic={topicFAQ}/>