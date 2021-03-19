<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { subscribe } from 'svelte-apollo';
  import { parseMD } from 'utils/markdown';
  import { ANSWERS_IN_PROGRESS, COHORT_ANSWER_PROGRESS } from 'graphql/queries/cohort-answer-in-progress';
  import QuestionFooter from 'components/QuestionFooter.svelte';
  import QuestionAnswers from 'components/QuestionAnswers.svelte';
  import QuestionStatus from 'components/QuestionStatus.svelte'

  const { session } = stores();

  export let details;

  let answersInProgress = [];
  let beingAnsweredBy = [];
  let answeredBy = [];

  $: content = parseMD(details.question);
  $: isBeingAnswered = !!beingAnsweredBy.length;
  $: isAnswered = !!answeredBy.length;

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
        if (newAnswerInProgress.isActive) {
          newAnswersInProgressData = [...answersInProgress, newAnswerInProgress];
        }
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

<style>
  .question {
    position: relative;
    padding: 1rem;
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
  h3 > :global(p) {
    margin-top: 0;
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
</article>
