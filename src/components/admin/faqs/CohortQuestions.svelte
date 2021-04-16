<script>
  import { parseMD } from 'utils/markdown';
  import CohortAnswers from 'components/admin/faqs/CohortAnswers.svelte';
  import Question from 'components/admin/faqs/Question.svelte';
  import QuestionMeta from 'components/admin/faqs/QuestionMeta.svelte';

  export let questions;
  export let variant;
</script>

<style>
  h4 {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
</style>

{#if questions.length}
  {#each questions as question (question.id)}
    <Question {variant}>
      <h4>{@html parseMD(question.question)}</h4>
      {#if question.cohortAnswers.length}
        <CohortAnswers answers={question.cohortAnswers}/>
      {/if}
      <QuestionMeta
        cohort={question.cohort.title}
        timestamp={question.createdAt}
      />
    </Question>
  {/each}
{:else}
  <p>No cohort questions for this topic yet. 🙅🏼</p>
{/if}