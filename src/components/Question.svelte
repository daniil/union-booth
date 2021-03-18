<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { parseMD } from 'utils/markdown';
  import { ANSWERS_IN_PROGRESS } from 'graphql/queries/cohort-answer-in-progress';
  import QuestionFooter from 'components/QuestionFooter.svelte';
  import QuestionAnswers from 'components/QuestionAnswers.svelte';
  import QuestionStatus from 'components/QuestionStatus.svelte'

  const { session } = stores();

  export let details;

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
    .subscribe(({ data }) => {
      if (!data) return;
      beingAnsweredBy = data.answersInProgress.filter(item => {
        return item.isActive
      });
      answeredBy = data.answersInProgress.filter(item => {
        return !item.isActive;
      })
    });
  
  onDestroy(() => answersInProgressSub.unsubscribe());
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
  <QuestionAnswers questionId={details.id}/>
  {#if isBeingAnswered || isAnswered}
    <QuestionStatus
      {beingAnsweredBy}
      {answeredBy}
    />
  {/if}
</article>
