<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { LIVE_QUESTIONS } from 'graphql/queries/cohort-question';
  import Loading from 'components/Loading.svelte';

  const { session } = stores();

  export let topic;

  let questions = [];
  let loading = true;

  $: liveQuestionsSub = $session.apolloClient
    .watchQuery({
      query: LIVE_QUESTIONS,
      variables: {
        cohortId: topic.cohortId,
        topicId: topic.topic.id
      },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      if (!data) return;
      questions = data.liveQuestions;
      loading = false;
    });

  onDestroy(() => liveQuestionsSub.unsubscribe());
</script>

{#if loading}
  <Loading/>
{:else}
  {#each questions as question (question.id)}
    <div transition:slide|local="{{ duration: 300, easing: cubicOut }}">
      <h2>{question.question}</h2>
      <p>
        {#if !question.isAnonymous}
          by {question.user.username}
        {:else}
          🦹🏾
        {/if}
      </p>
    </div>
  {:else}
    <p>No questions yet, add a first one!</p>
  {/each}
{/if}