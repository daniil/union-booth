<script>
  export let answers;
</script>

<h5>Answers</h5>
{#each answers as answer (answer.id) }
  <p>{answer.answer}</p>
{/each}