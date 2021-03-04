<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { subscribe } from 'svelte-apollo';
  import { LIVE_ANSWERS, NEW_COHORT_ANSWER } from 'graphql/queries/cohort-answer';
  import Loading from 'components/Loading.svelte';
  import Answer from 'components/Answer.svelte';
  import PostAnswer from 'components/PostAnswer.svelte';

  const { session } = stores();

  export let questionId;

  let answers = [];
  let loading = true;

  $: liveAnswersSub = $session.apolloClient
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
  
  onDestroy(() => liveAnswersSub.unsubscribe());

  const newCohortAnswer = subscribe(NEW_COHORT_ANSWER, {
    variables: {
      cohortQuestionId: questionId
    }
  });

  const newCohortAnswerUnsub = newCohortAnswer.subscribe(value => {
    if (value.data) {
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

  onDestroy(newCohortAnswerUnsub);
</script>

<style>
  section {
    margin: 2rem 0 0;
    border-bottom: 1px solid #DBD3D8;
  }
  h3 {
    margin-bottom: 1rem;
    color: #3E6990;
    font-size: 1rem;
  }
</style>

{#if loading}
  <Loading/>
{:else}
  {#if answers.length}
    <section>
      <h3>Answers</h3>
      {#each answers as answer (answer.id)}
        <div transition:slide|local="{{ duration: 300, easing: cubicOut }}">
          <Answer details={answer}/>
        </div>
      {/each}
    </section>
  {/if}
{/if}
<PostAnswer {questionId}/>
