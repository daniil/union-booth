<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { subscribe } from 'svelte-apollo';
  import {
    LIVE_ANSWERS,
    NEW_COHORT_ANSWER,
    COHORT_ANSWER_UPDATED,
    COHORT_ANSWER_DEACTIVATED
  } from 'graphql/queries/cohort-answer';
  import Loading from 'components/shared/Loading.svelte';
  import Answer from 'components/live-answers/Answer.svelte';
  import PostAnswer from 'components/live-answers/PostAnswer.svelte';

  const { session } = stores();

  export let questionId;
  export let beingAnsweredBy;
  export let answeredBy;

  let answers = [];
  let answerContainers = {};
  let loading = true;
  let answersExpanded = false;
  let selectedAnswer;

  $: liveAnswersSub = watchLiveAnswersQuery(questionId);

  const watchLiveAnswersQuery = questionId => {
    return $session.apolloClient
      .watchQuery({
        query: LIVE_ANSWERS,
        variables: {
          cohortQuestionId: questionId
        },
        fetchPolicy: 'cache-and-network'
      })
      .subscribe(({ data }) => {
        if (!data) return;
        answers = data.liveAnswers;
        loading = false;
      });
  }
  
  onDestroy(() => liveAnswersSub.unsubscribe());

  $: newCohortAnswer = subscribe(NEW_COHORT_ANSWER, {
    variables: {
      cohortQuestionId: questionId
    }
  });

  $: newCohortAnswerUnsub = subscribeToChanges(questionId);

  const subscribeToChanges = questionId => {
    return newCohortAnswer.subscribe(value => {
      const needsUpdating = value.data && !answers.find(answer => answer.id === value.data.newCohortAnswer.id);

      if (needsUpdating) {
        $session.apolloClient.writeQuery({
          query: LIVE_ANSWERS,
          variables: {
            cohortQuestionId: questionId
          },
          data: {
            liveAnswers: [...answers, value.data.newCohortAnswer]
          }
        });
      }
    });
  }

  onDestroy(() => newCohortAnswerUnsub());

  $: cohortAnswerUpdated = subscribe(COHORT_ANSWER_UPDATED, {
    variables: {
      cohortQuestionId: questionId
    }
  });

  $: cohortAnswerUpdatedUnsub = subscribeToCohortAnswerUpdated(questionId);

  const subscribeToCohortAnswerUpdated = questionId => {
    return cohortAnswerUpdated.subscribe(value => {
      if (value.data) {
        $session.apolloClient.writeQuery({
          query: LIVE_ANSWERS,
          variables: {
            cohortQuestionId: questionId
          },
          data: {
            liveAnswers: answers.map(answer => {
              if (answer.id === value.data.cohortAnswerUpdated.id) {
                return value.data.cohortAnswerUpdated;
              } else {
                return answer;
              }
            })
          }
        });
      }
    });
  }

  onDestroy(() => cohortAnswerUpdatedUnsub());

  $: cohortAnswerDeactivated = subscribe(COHORT_ANSWER_DEACTIVATED, {
    variables: {
      cohortQuestionId: questionId
    }
  });

  $: cohortAnswerDeactivatedUnsub = subscribeToCohortAnswerDeactivated(questionId);

  const subscribeToCohortAnswerDeactivated = questionId => {
    return cohortAnswerDeactivated.subscribe(value => {
      if (value.data && value.data.cohortAnswerDeactivated.isInactive) {
        $session.apolloClient.writeQuery({
          query: LIVE_ANSWERS,
          variables: {
            cohortQuestionId: questionId
          },
          data: {
            liveAnswers: answers.filter(answer => answer.id !== value.data.cohortAnswerDeactivated.id)
          }
        });
      }
    });
  }

  onDestroy(() => cohortAnswerDeactivatedUnsub());

  const toggleAnswers = () => {
    answersExpanded = !answersExpanded;
  }

  const handleScrollToAnswer = e => {
    answerContainers[e.detail.answerId].scrollIntoView({ behavior: 'smooth' });
  }

  const handleAnswerPublished = () => {
    answersExpanded = true;
  }

  const handleEdit = e => {
    selectedAnswer = answers.find(answer => answer.id === e.detail.answerId);
  }

  const handleCancelAnswer = () => {
    selectedAnswer = null;
  }
</script>

<style lang="scss">
  .loader-container {
    position: relative;
    top: 1rem;
  }
  section {
    margin: 2rem 0 0;
  }
  h3 {
    display: flex;
    margin-bottom: 0;
    color: #3E6990;
    font-size: 0.9rem;
    @media (min-width: 48rem) {
      margin-bottom: 1rem;
      font-size: 1rem;
    }
    > strong {
      margin-right: 0.25rem;
    }
  }
  .expand-answers {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    &:hover {
      filter: brightness(1.25);
      .expand-icon {
        transform: translateY(-6px) rotate(90deg);
        @media (min-width: 48rem) {
          transform: translateY(-2px) rotate(90deg);
        }
        &.is-expanded {
          transform: translateY(-6px) translateX(-4px) rotate(-90deg);
        }
      }
    }
  }
  .expand-icon {
    font-size: 1.5rem;
    margin-left: 0.75rem;
    transition: transform 0.25s ease-out;
    transform: translateY(-6px) rotate(90deg);
    @media (min-width: 48rem) {
      transform: translateY(-4px) rotate(90deg);
    }
    &.is-expanded {
      transform: translateY(-4px) translateX(-4px) rotate(-90deg);
    }
  }
  .answer-container {
    margin-top: 1rem;
    border-bottom: 1px solid #DBD3D8;
  }
</style>

{#if loading}
  <div class="loader-container">
    <Loading/>
  </div>
{:else}
  {#if answers.length}
    <section>
      <button class="expand-answers" on:click={toggleAnswers}>
        <h3>
          <strong>{answers.length}</strong> Answers
          <div class="expand-icon" class:is-expanded={answersExpanded}>&rsaquo;</div>
        </h3>
      </button>
      {#if answersExpanded}
        <div class="answer-container" transition:slide|local="{{ duration: 300, easing: cubicOut }}">
          {#each answers as answer (answer.id)}
            <div bind:this={answerContainers[answer.id]}>
              <Answer
                details={answer}
                on:edit={handleEdit}
              />
            </div>
          {/each}
        </div>
      {/if}
    </section>
  {/if}
{/if}
<PostAnswer
  {questionId}
  {beingAnsweredBy}
  {answeredBy}
  {selectedAnswer}
  on:scroll-to-answer={handleScrollToAnswer}
  on:answer-published={handleAnswerPublished}
  on:cancel-answer={handleCancelAnswer}
/>
