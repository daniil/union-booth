<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { subscribe } from 'svelte-apollo';
  import { LIVE_QUESTIONS, NEW_COHORT_QUESTION } from 'graphql/queries/cohort-question';
  import Loading from 'components/Loading.svelte';
  import Question from 'components/Question.svelte';
  import AskQuestion from 'components/AskQuestion.svelte';

  const { session } = stores();

  export let liveTopic;

  let questions = [];
  let loading = true;

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

  const newCohortQuestion = subscribe(NEW_COHORT_QUESTION, {
    variables: {
      cohortId: liveTopic.cohortId,
      topicId: liveTopic.topic.id
    }
  });

  const newCohortQuestionUnsub = newCohortQuestion.subscribe(value => {
    if (value.data) {
      $session.apolloClient.writeQuery({
        query: LIVE_QUESTIONS,
        variables: {
          cohortId: liveTopic.cohortId,
          topicId: liveTopic.topic.id
        },
        data: {
          liveQuestions: [value.data.newCohortQuestion, ...questions]
        }
      });
    }
  });

  onDestroy(newCohortQuestionUnsub);
</script>

{#if loading}
  <Loading/>
{:else}
  {#each questions as question (question.id)}
    <div transition:slide|local="{{ duration: 300, easing: cubicOut }}">
      <Question details={question}/>
    </div>
  {:else}
    <p>No questions yet, add a first one!</p>
  {/each}
{/if}
<AskQuestion {liveTopic}/>