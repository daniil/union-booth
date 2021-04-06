<svelte:head>
	<title>Union Booth :: FAQs: {cohortTopic.topic ? cohortTopic.topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { TOPIC_FAQ_ADMIN } from 'graphql/queries/admin/topic-faq';

  export async function preload(page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    await session.apolloClient.query({
      query: TOPIC_FAQ_ADMIN,
      variables: { slug: page.params.slug }
    });

    return {
      slug: page.params.slug
    };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import CohortQuestions from 'components/admin/faqs/CohortQuestions.svelte';

  export let slug;

  const { session } = stores();

  let cohortTopic = $session.apolloClient.readQuery({
    query: TOPIC_FAQ_ADMIN,
    variables: { slug }
  }).topicFAQAdmin;
</script>

<style>
  section {
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 1rem;
    color: rgba(85, 67, 72, 0.7);
  }
  .back {
    display: block;
    margin-top: 2rem;
  }
</style>

<section>
  <h2>{cohortTopic.topic.title} FAQs</h2>
  <h3>Published Q and A</h3>
  <h3>Cohort Questions</h3>
  <CohortQuestions questions={cohortTopic.cohortQuestions}/>
  <a class="back" href="/admin/faqs">&#10092; back</a>
</section>
