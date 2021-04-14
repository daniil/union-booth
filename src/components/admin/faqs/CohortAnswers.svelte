<script>
  import { parseMD } from 'utils/markdown';

  export let answers;
</script>

<style>
  h5 {
    color: #3E6990;
  }
  p {
    font-size: 0.95rem;
  }
  p:not(:last-of-type) {
    border-bottom: 1px solid #F6F4F5;
  }
</style>

<h5>Answers</h5>
{#each answers as answer (answer.id) }
  <p>{@html parseMD(answer.answer)}</p>
{/each}