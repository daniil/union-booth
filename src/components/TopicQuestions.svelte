<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { subscribe } from 'svelte-apollo';
  import { LIVE_QUESTIONS, NEW_COHORT_QUESTION, COHORT_QUESTION_DEACTIVATED } from 'graphql/queries/cohort-question';
  import Loading from 'components/Loading.svelte';
  import Question from 'components/Question.svelte';
  import PostQuestion from 'components/PostQuestion.svelte';

  const { session } = stores();

  export let liveTopic;

  let questions = [];
  let loading = true;
  let selectedQuestion;

  $: liveQuestionsSub = $session.apolloClient
    .watchQuery({
      query: LIVE_QUESTIONS,
      variables: {
        cohortId: liveTopic.cohortId,
        topicId: liveTopic.topic.id
      },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      if (!data) return;
      questions = data.liveQuestions;
      loading = false;
    });

  onDestroy(() => liveQuestionsSub.unsubscribe());

  $: newCohortQuestion = subscribe(NEW_COHORT_QUESTION, {
    variables: {
      cohortId: liveTopic.cohortId,
      topicId: liveTopic.topic.id
    }
  });

  $: newCohortQuestionUnsub = subscribeToNewCohortQuestion(liveTopic.cohortId, liveTopic.topic.id);

  const subscribeToNewCohortQuestion = (cohortId, topicId) => {
    return newCohortQuestion.subscribe(value => {
      const needsUpdating = value.data && !questions.find(question => question.id === value.data.newCohortQuestion.id);

      if (needsUpdating) {
        $session.apolloClient.writeQuery({
          query: LIVE_QUESTIONS,
          variables: {
            cohortId,
            topicId
          },
          data: {
            liveQuestions: [...questions, value.data.newCohortQuestion]
          }
        });
      }
    });
  }

  onDestroy(() => newCohortQuestionUnsub());

  $: cohortQuestionDeactivated = subscribe(COHORT_QUESTION_DEACTIVATED, {
    variables: {
      cohortId: liveTopic.cohortId,
      topicId: liveTopic.topic.id
    }
  });

  $: cohortQuestionDeactivatedUnsub = subscribeToCohortQuestionDeactivated(liveTopic.cohortId, liveTopic.topic.id);

  const subscribeToCohortQuestionDeactivated = (cohortId, topicId) => {
    return cohortQuestionDeactivated.subscribe(value => {
      if (value.data && value.data.cohortQuestionDeactivated.isInactive) {
        $session.apolloClient.writeQuery({
          query: LIVE_QUESTIONS,
          variables: {
            cohortId,
            topicId
          },
          data: {
            liveQuestions: questions.filter(question => question.id !== value.data.cohortQuestionDeactivated.id)
          }
        });
      }
    });
  }

  onDestroy(() => cohortQuestionDeactivatedUnsub());

  const handleEdit = e => {
    selectedQuestion = questions.find(question => question.id === e.detail.questionId);
  }

  const handleCancelQuestion = () => {
    selectedQuestion = null;
  }
</script>

<style>
  .question-container {
    margin-bottom: 4rem;
  }
</style>

{#if loading}
  <Loading/>
{:else}
  {#each questions as question (question.id)}
    <div class="question-container" transition:slide|local="{{ duration: 300, easing: cubicOut }}">
      <Question
        details={question}
        on:edit={handleEdit}
      />
    </div>
  {:else}
    <p>No questions yet, add a first one!</p>
  {/each}
{/if}
<PostQuestion
  {liveTopic}
  {selectedQuestion}
  on:cancel-question={handleCancelQuestion}
/>