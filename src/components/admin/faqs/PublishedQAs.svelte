<script>
  export let questions;
</script>

{#if questions.length}
  {#each questions as question (question.id)}
    <h4>{question.question}</h4>
    <p>{question.answer}</p>
  {/each}
{:else}
  <p>No published QAs for this topic yet. 🙅🏽‍♂️</p>
{/if}