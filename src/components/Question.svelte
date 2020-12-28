<script>
  import marked from 'marked';
  import DOMPurify from 'dompurify';
  import { formatDate, formatTime } from '../utils/time';
  import QuestionAnswers from './QuestionAnswers.svelte';

  export let details;
  export let interactive;

  $: content = DOMPurify.sanitize(marked(details.question));
  $: date = formatDate(details.dateCreated);
  $: time = formatTime(details.dateCreated);
</script>

<style>
  .question {
    padding: 1rem;
    border: 1px solid #91B7C7;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  time {
    display: flex;
    justify-content: space-between;
  }
</style>

<article class="question">
  <h3>{@html content}</h3>
  <time>
    <span>{date}</span>
    <span>{time}</span>
  </time>
  {#if interactive}
    <QuestionAnswers question-id={details.id}/>
  {/if}
</article>
