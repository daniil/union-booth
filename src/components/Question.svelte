<script>
  import { parseMD } from '../utils/markdown';
  import { formatDate, formatTime } from '../utils/time';

  export let topicId;
  export let details;

  $: content = parseMD(details.question);
  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
</script>

<style>
  .question {
    position: relative;
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
</article>
