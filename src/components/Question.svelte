<script>
  import { formatDate, formatTime } from '../utils/time';

  export let details;

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
  <h3>{details.question}</h3>
  <time>
    <span>{date}</span>
    <span>{time}</span></time>
</article>
