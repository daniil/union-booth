<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { get } from '../utils/request';
  import Answer from './Answer.svelte';
  import PostAnswer from './PostAnswer.svelte';

  export let questionId = $$props['question-id'];

  let answers = [];

  const fetchAnswers = async () => {
    const res = await get(`/discourse/answers/${questionId}.json`);

    if (!res.error) {
      answers = res.data;
    } else {
      console.log('ERROR: ', res.error);
    }
  };

  onMount(async () => {
    fetchAnswers();
  });
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
<PostAnswer
  question-id={questionId}
  on:answer-added={fetchAnswers}
/>