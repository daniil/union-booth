<script>
  import { parseMD } from 'utils/markdown';
  import QuestionMeta from 'components/admin/faqs/QuestionMeta.svelte';

  export let questions;
</script>

<style>
  .published-qas {
    margin-bottom: 4rem;
  }
</style>

<div class="published-qas">
  {#if questions.length}
    {#each questions as question (question.id)}
      <div class="question">
        <h4>{@html parseMD(question.question)}</h4>
        <p>{question.answer}</p>
        <QuestionMeta timestamp={question.createdAt}/>
      </div>
    {/each}
  {:else}
    <p>No published QAs for this topic yet. 🙅🏽‍♂️</p>
  {/if}
</div>
