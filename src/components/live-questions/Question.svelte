<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { subscribe } from 'svelte-apollo';
  import { parseMD } from 'utils/markdown';
  import { ANSWERS_IN_PROGRESS, COHORT_ANSWER_PROGRESS } from 'graphql/queries/cohort-answer-in-progress';
  import roleMap from 'utils/role-map';
  import QuestionFooter from 'components/live-questions/QuestionFooter.svelte';
  import QuestionAnswers from 'components/live-answers/QuestionAnswers.svelte';
  import QuestionStatus from 'components/live-questions/QuestionStatus.svelte'
  import QuestionActions from 'components/live-questions/QuestionActions.svelte';
  
  export let details;

  const { session } = stores();
  
  let answersInProgress = [];
  let beingAnsweredBy = [];
  let answeredBy = [];

  $: content = parseMD(details.question);
  $: isBeingAnswered = !!beingAnsweredBy.length;
  $: isAnswered = !!answeredBy.length;
  $: isOwner = $session.user.id === details.user.id;
  $: questionActionsEnabled = roleMap[$session.user.role].includes('moderator') || isOwner;

  $: answersInProgressSub = $session.apolloClient
    .watchQuery({
      query: ANSWERS_IN_PROGRESS,
      variables: {
        cohortQuestionId: details.id
      },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(handleAnswersInProgressSub);
  
  const handleAnswersInProgressSub = ({ data }) => {
    if (!data) return;

    answersInProgress = data.answersInProgress;
    beingAnsweredBy = answersInProgress.filter(item => {
      return item.isActive
    });
    answeredBy = answersInProgress.filter(item => {
      return !item.isActive;
    })
  }
  
  onDestroy(() => answersInProgressSub.unsubscribe());

  $: cohortAnswerProgress = subscribe(COHORT_ANSWER_PROGRESS, {
    variables: {
      cohortQuestionId: details.id
    }
  });

  $: cohortAnswerProgressUnsub = subscribeToChanges(details.id);

  const subscribeToChanges = questionId => {
    return cohortAnswerProgress.subscribe(value => {
      if (!value.data) return;
      
      const newAnswerInProgress = value.data.cohortAnswerProgress;
      const inTheList = answersInProgress.find(answer => answer.user.username === newAnswerInProgress.user.username);
      let newAnswersInProgressData;

      if (inTheList) {
        newAnswersInProgressData = answersInProgress.map(answer => {
          if (answer.user.username === inTheList.user.username) {
            return newAnswerInProgress;
          }
          return answer;
        })
      } else {
        newAnswersInProgressData = [...answersInProgress, newAnswerInProgress];
      }

      $session.apolloClient.writeQuery({
        query: ANSWERS_IN_PROGRESS,
        variables: {
          cohortQuestionId: questionId
        },
        data: {
          answersInProgress: newAnswersInProgressData
        }
      });
    })
  }

  onDestroy(() => cohortAnswerProgressUnsub());
</script>

<style lang="scss">
  .question {
    position: relative;
    padding: 1.5rem 1.25rem 1.25rem 1.25rem;
    border: 1px solid #DBD3D8;
    border-bottom-width: 2px;
    border-radius: 4px;
    margin-bottom: 2rem;
    transition: border-color 0.25s ease-out, background-color 0.25s ease-out;
  }
  .is-being-answered {
    border-color: rgb(212, 224, 155);
  }
  .is-answered {
    background-color: rgba(212, 224, 155, 0.15);
    border-color: rgb(212, 224, 155);
  }
  h3 {
    font-size: 1.05rem;
    @media (min-width: 48rem) {
      font-size: 1.17rem;
    }
  }
  h3 > :global(p) {
    margin-top: 0;
  }
  .actions-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 40%);
    z-index: 1;
  }
</style>

<article
  class="question"
  class:is-being-answered={isBeingAnswered}
  class:is-answered={isAnswered}>
  <h3>{@html content}</h3>
  <QuestionFooter {details}/>
  <QuestionAnswers
    questionId={details.id}
    {beingAnsweredBy}
    {answeredBy}
  />
  {#if isBeingAnswered || isAnswered}
    <QuestionStatus
      {beingAnsweredBy}
      {answeredBy}
    />
  {/if}
  {#if questionActionsEnabled}
    <div class="actions-container" data-id={details.id}>
      <QuestionActions
        questionId={details.id}
        {isOwner}
        on:edit
      />
    </div>
  {/if}
</article>
