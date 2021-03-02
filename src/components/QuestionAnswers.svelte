<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { LIVE_ANSWERS } from 'graphql/queries/cohort-answer';
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
</script>

<style>
  section {
    margin: 2rem 0;
    padding: 1rem 0;
    border-top: 1px solid #91B7C7;
    border-bottom: 1px solid #91B7C7;
  }
  h3 {
    margin-bottom: 1rem;
    color: #91B7C7;
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
