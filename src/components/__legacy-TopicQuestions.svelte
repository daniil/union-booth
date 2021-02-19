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
    const res = await get(`topics/questions/${id}.json`);
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
        topicId={id}
        details={question}
        interactive
      />
    </div>
  {:else}
    <p>No questions yet, add a first one!</p>
  {/each}
{/if}
<AskQuestion
  topicId={id}
  on:question-added={fetchQuestions}
/>
