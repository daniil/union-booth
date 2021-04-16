<script>
  import { parseMD } from 'utils/markdown';
  import Question from 'components/admin/faqs/Question.svelte';
  import Answer from 'components/admin/faqs/Answer.svelte';
  import QuestionMeta from 'components/admin/faqs/QuestionMeta.svelte';

  export let questions;
  export let variant;
</script>

<style>
  .published-qas {
    margin-bottom: 4rem;
  }
  h4 {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  h5 {
    margin-bottom: 0.75rem;
    color: #3E6990;
  }
</style>

<div class="published-qas">
  {#if questions.length}
    {#each questions as question (question.id)}
      <Question {variant}>
        <h4>{@html parseMD(question.question)}</h4>
        <h5>Answer</h5>
        <Answer>
          {@html parseMD(question.answer)}
        </Answer>
        <QuestionMeta timestamp={question.createdAt}/>
      </Question>
    {/each}
  {:else}
    <p>No published QAs for this topic yet. 🙅🏽‍♂️</p>
  {/if}
</div>
