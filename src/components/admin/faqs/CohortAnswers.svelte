<script>
  import { parseMD } from 'utils/markdown';
  import Answer from 'components/admin/faqs/Answer.svelte';

  export let answers;
</script>

<style>
  h5 {
    margin-bottom: 0.75rem;
    color: #3E6990;
  }
  p:not(:last-of-type) {
    border-bottom: 1px solid #F6F4F5;
  }
</style>

<h5>Answers</h5>
<Answer>
  {#each answers as answer (answer.id) }
    <p>{@html parseMD(answer.answer)}</p>
  {/each}
</Answer>
