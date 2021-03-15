<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { parseMD } from 'utils/markdown';
  import { formatDate, formatTime } from 'utils/time';
  import { ANSWERS_IN_PROGRESS } from 'graphql/queries/cohort-answer-in-progress';
  import Avatar from 'components/Avatar.svelte';
  import QuestionAnswers from 'components/QuestionAnswers.svelte';
  import QuestionStatus from 'components/QuestionStatus.svelte'

  const { session } = stores();

  export let details;

  let beingAnsweredBy = [];
  let answeredBy = [];

  $: content = parseMD(details.question);
  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
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
      console.log(data.answersInProgress);
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
  }
  .is-being-answered {
    background-color: rgba(212, 224, 155, 0.15);
    border-color: rgb(212, 224, 155);
  }

  .is-answered {
    background-color: rgba(212, 224, 155, 0.3);
    border-color: rgb(212, 224, 155);
    border-top-width: 3px;
  }
  h3 > :global(p) {
    margin-top: 0;
  }
  .meta {
    display: flex;
    align-items: center;
  }
  time {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
</style>

<article
  class="question"
  class:is-being-answered={isBeingAnswered}
  class:is-answered={isAnswered}>
  <h3>{@html content}</h3>
  <footer class="meta">
    {#if details.isAnonymous}
      <Avatar/>
    {:else}
      <Avatar user={details.user}/>
    {/if}
    <time>
      <span>{time}</span>
      <span>{date}</span>
    </time>
  </footer>
  <QuestionAnswers questionId={details.id}/>
  {#if isBeingAnswered || isAnswered}
    <!-- <QuestionStatus {details}/> -->
  {/if}
</article>
