<svelte:head>
	<title>Union Booth :: FAQs: {topicFAQ.topic ? topicFAQ.topic.title : 'Loading'}</title>
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
  import { onDestroy } from 'svelte';
  import PublishedQAs from 'components/admin/faqs/PublishedQAs.svelte';
  import CohortQuestionsFilter from 'components/admin/faqs/CohortQuestionsFilter.svelte';
  import CohortQuestions from 'components/admin/faqs/CohortQuestions.svelte';
  import QAEditor from 'components/admin/faqs/QAEditor.svelte';
  import Button from 'components/Button.svelte';

  export let slug;

  const { session } = stores();
  let editorIsVisible = false;
  let filterValue;

  let topicFAQ = $session.apolloClient.readQuery({
    query: TOPIC_FAQ_ADMIN,
    variables: { slug }
  }).topicFAQAdmin;

  const topicFAQSub = $session.apolloClient
    .watchQuery({
      query: TOPIC_FAQ_ADMIN,
      variables: { slug },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      topicFAQ = data.topicFAQAdmin;
    });
  
  onDestroy(() => topicFAQSub.unsubscribe());

  const toggleQAEditor = () => {
    editorIsVisible = !editorIsVisible;
  }

  const handleClose = () => {
    editorIsVisible = false;
  }
</script>

<style>
  section {
    position: relative;
    margin-bottom: 2rem;
  }
  .back {
    position: absolute;
    display: block;
    top: -45px;
    text-decoration: none;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  h3 {
    margin-bottom: 1rem;
    color: rgba(85, 67, 72, 0.7);
  }
</style>

<section>
  <a class="back" href="/admin/faqs">&#10092; back</a>
  <h2 class="title">
    {topicFAQ.topic.title} FAQs
    <Button variant="success" icon="➕" label="Add New Q/A" action={toggleQAEditor} disabled={editorIsVisible}/>
  </h2>
  <h3>Published Q and A</h3>
  <PublishedQAs questions={topicFAQ.topicFAQQuestions}/>
  <h3>Cohort Questions</h3>
  <CohortQuestionsFilter bind:value={filterValue}/>
  <CohortQuestions questions={topicFAQ.cohortQuestions}/>
</section>
<QAEditor
  {topicFAQ}
  visible={editorIsVisible}
  on:close={handleClose}
/>