<script>
  import marked from 'marked';
  import DOMPurify from 'dompurify';

  export let details;

  $: content = DOMPurify.sanitize(marked(details.answer));
</script>

<style>
  h4 {
    margin-bottom: 1rem;
    padding-left: 1rem;
  }
</style>

<h4>{@html content}</h4>