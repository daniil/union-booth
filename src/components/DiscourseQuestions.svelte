<script>
  import { onMount } from 'svelte';
  import { get } from '../utils/request';
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import Loading from './Loading.svelte';
  import Question from './Question.svelte';
  import AskQuestion from './AskQuestion.svelte';

  export let id;

  let questions = [];
  let loading = true;

  onMount(async () => {
    fetchQuestions();
  });

  const fetchQuestions = async () => {
    loading = true;
    const res = await get(`discourse/questions/${id}.json`);
    loading = false;

    if (!res.error) {
      questions = res.data;
    } else {
      console.log('ERROR: ', res.error);
    }
  }
</script>

{#if loading}
  <Loading/>
{:else}
  {#each questions as question (question.id)}
    <div transition:slide|local="{{ duration: 300, easing: cubicOut }}">
      <Question
        discourse-id={id}
        details={question}
        interactive
      />
    </div>
  {:else}
    <p>No questions yet, add a first one!</p>
  {/each}
{/if}
<AskQuestion
  discourse-id={id}
  on:question-added={fetchQuestions}
/>
