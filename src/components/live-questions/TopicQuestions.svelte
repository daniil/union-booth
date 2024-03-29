<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { subscribe } from 'svelte-apollo';
  import {
    LIVE_QUESTIONS,
    NEW_COHORT_QUESTION,
    COHORT_QUESTION_UPDATED,
    COHORT_QUESTION_DEACTIVATED
  } from 'graphql/queries/cohort-question';
  import Loading from 'components/shared/Loading.svelte';
  import Question from 'components/live-questions/Question.svelte';
  import PostQuestion from 'components/live-questions/PostQuestion.svelte';

  export let liveTopic;
  
  const { session } = stores();
  
  let questions = [];
  let questionContainers = {};
  let loading = true;
  let selectedQuestion;

  $: liveQuestionsSub = watchLiveQuestionsQuery(liveTopic);

  const watchLiveQuestionsQuery = liveTopic => {
    return $session.apolloClient
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
  }

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

  $: cohortQuestionUpdated = subscribe(COHORT_QUESTION_UPDATED, {
    variables: {
      cohortId: liveTopic.cohortId,
      topicId: liveTopic.topic.id
    }
  });

  $: cohortQuestionUpdatedUnsub = subscribeToCohortQuestionUpdated(liveTopic.cohortId, liveTopic.topic.id);

  const subscribeToCohortQuestionUpdated = (cohortId, topicId) => {
    return cohortQuestionUpdated.subscribe(value => {
      if (value.data) {
        $session.apolloClient.writeQuery({
          query: LIVE_QUESTIONS,
          variables: {
            cohortId,
            topicId
          },
          data: {
            liveQuestions: questions.map(question => {
              if (question.id === value.data.cohortQuestionUpdated.id) {
                return value.data.cohortQuestionUpdated;
              } else {
                return question;
              }
            })
          }
        });
      }
    });
  }

  onDestroy(() => cohortQuestionUpdatedUnsub());

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

  const handleScrollToQuestion = e => {
    questionContainers[e.detail.questionId].scrollIntoView({ behavior: 'smooth' });
  }
</script>

<style>
  .question-container {
    margin-bottom: 4rem;
  }
  p {
    padding: 1rem 0 2rem;
    text-align: center;
    color: #7D6D61;
  }
</style>

{#if loading}
  <Loading/>
{:else}
  {#each questions as question (question.id)}
    <div
      class="question-container"
      transition:slide|local="{{ duration: 300, easing: cubicOut }}"
      bind:this={questionContainers[question.id]}
    >
      <Question
        details={question}
        on:edit={handleEdit}
      />
    </div>
  {:else}
    <p>No questions yet, be the first to ask one!</p>
  {/each}
{/if}
<PostQuestion
  {liveTopic}
  {selectedQuestion}
  on:cancel-question={handleCancelQuestion}
  on:scroll-to-question={handleScrollToQuestion}
/>