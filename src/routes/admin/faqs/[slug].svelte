<svelte:head>
	<title>Union Booth :: FAQs: {topicFAQ.topic ? topicFAQ.topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { TOPIC_FAQ_ADMIN, DEACTIVATE_TOPIC_FAQ_QUESTION } from 'graphql/queries/admin/topic-faq';

  export async function preload(page, session) {
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
  import { mutation } from 'svelte-apollo';
  import { onDestroy } from 'svelte';
  import PublishedQAs from 'components/admin/faqs/PublishedQAs.svelte';
  import CohortQuestionsFilter from 'components/admin/faqs/CohortQuestionsFilter.svelte';
  import CohortQuestions from 'components/admin/faqs/CohortQuestions.svelte';
  import QAEditor from 'components/admin/faqs/QAEditor.svelte';
  import Button from 'components/forms/Button.svelte';

  export let slug;

  const { session } = stores();

  const deactivateTopicFAQQuestion = mutation(DEACTIVATE_TOPIC_FAQ_QUESTION);

  let editorIsVisible = false;
  let filterValue;
  let selectedQuestion;
  let editorMode;
  
  $: cohortQuestionsVariant = filterValue === 'published' ? 'subtle' : '';

  let topicFAQ = $session.apolloClient.readQuery({
    query: TOPIC_FAQ_ADMIN,
    variables: { slug }
  }).topicFAQ;

  const topicFAQSub = $session.apolloClient
    .watchQuery({
      query: TOPIC_FAQ_ADMIN,
      variables: { slug },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      topicFAQ = data.topicFAQ;
    });
  
  onDestroy(() => topicFAQSub.unsubscribe());

  const handleAddNew = () => {
    editorMode = 'add';
    editorIsVisible = true;
  }

  const handleClose = () => {
    editorMode = null;
    selectedQuestion = null;
    editorIsVisible = false;
  }

  const handlePublish = e => {
    editorMode = 'publish';
    selectedQuestion = topicFAQ.cohortQuestions.find(question => question.id === e.detail.questionId);
    if (selectedQuestion) editorIsVisible = true;
  }

  const handleEdit = e => {
    editorMode = 'edit';
    selectedQuestion = topicFAQ.topicFAQQuestions.find(question => question.id === e.detail.questionId);
    if (selectedQuestion) editorIsVisible = true;
  }

  const handleDeactivate = async e => {
    try {
      await deactivateTopicFAQQuestion({
        variables: {
          id: e.detail.questionId
        },
        update: (_, mutationResult) => {
          $session.apolloClient.writeQuery({
            query: TOPIC_FAQ_ADMIN,
            variables: { slug },
            data: {
              topicFAQ: {
                ...topicFAQ,
                topicFAQQuestions: topicFAQ.topicFAQQuestions.filter(question => question.id !== mutationResult.data.deactivateTopicFAQQuestion.id)
              }
            }
          })
        }
      });
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<style lang="scss">
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
    font-size: 1.25rem;
    @media (min-width: 48rem) {
      font-size: 1.5rem;
    }
  }
  h3 {
    margin-bottom: 1rem;
    color: rgba(85, 67, 72, 0.7);
    font-size: 1rem;
    @media (min-width: 48rem) {
      font-size: 1.17rem;
    }
  }
</style>

<section>
  <a class="back" href="/admin/faqs">&#10092; back</a>
  <h2 class="title">
    {topicFAQ.topic.title} FAQs
    <Button variant="success" icon="➕" label="Add New Q/A" action={handleAddNew} disabled={editorIsVisible}/>
  </h2>
  <h3>Published Q and A</h3>
  <PublishedQAs
    questions={topicFAQ.topicFAQQuestions}
    variant="completed"
    on:edit={handleEdit}
    on:deactivate={handleDeactivate}
  />
  <h3>Cohort Questions</h3>
  <CohortQuestionsFilter
    questions={topicFAQ.cohortQuestions}
    bind:value={filterValue}
  />
  <CohortQuestions
    questions={topicFAQ.cohortQuestions}
    filter={filterValue}
    variant={cohortQuestionsVariant}
    on:publish={handlePublish}
  />
</section>
<QAEditor
  topic={topicFAQ.topic}
  mode={editorMode}
  question={selectedQuestion}
  visible={editorIsVisible}
  on:close={handleClose}
/>