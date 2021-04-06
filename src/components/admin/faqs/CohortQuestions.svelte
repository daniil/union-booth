<script>
  import CohortAnswers from 'components/admin/faqs/CohortAnswers.svelte';

  export let questions;
</script>

{#each questions as question (question.id)}
  <h4>{question.question}</h4>
  {#if question.cohortAnswers.length}
    <CohortAnswers answers={question.cohortAnswers}/>
  {/if}
{/each}