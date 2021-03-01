<script>
  import { parseMD } from 'utils/markdown';

  export let details;

  $: content = parseMD(details.answer);
</script>

<style>
  h4 {
    margin-bottom: 1rem;
    padding-left: 1rem;
  }
</style>

<h4>{@html content}</h4>