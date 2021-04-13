<script>
  export let questions;
</script>

{#each questions as question (question.id)}
  <h4>{question.question}</h4>
  <p>{question.answer}</p>
{/each}