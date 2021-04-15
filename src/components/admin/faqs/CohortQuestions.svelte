<script>
  import { parseMD } from 'utils/markdown';
  import CohortAnswers from 'components/admin/faqs/CohortAnswers.svelte';
  import QuestionMeta from 'components/admin/faqs/QuestionMeta.svelte';

  export let questions;
</script>

<style>
  .question {
    padding: 1rem;
    margin-bottom: 2rem;
    background-color: #FFFDF7;
    border: 1px solid #E3DDE0;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  }
  h4 {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
</style>

{#if questions.length}
  {#each questions as question (question.id)}
    <div class="question">
      <h4>{@html parseMD(question.question)}</h4>
      {#if question.cohortAnswers.length}
        <CohortAnswers answers={question.cohortAnswers}/>
      {/if}
      <QuestionMeta
        cohort={question.cohort.title}
        timestamp={question.createdAt}
      />
    </div>
  {/each}
{:else}
  <p>No cohort questions for this topic yet. 🙅🏼</p>
{/if}