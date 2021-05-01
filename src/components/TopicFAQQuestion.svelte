<script>
  import { parseMD } from 'utils/markdown';
  import { formatDate } from 'utils/time';
  
  export let question;
</script>

<style>
  section {
    margin-bottom: 4rem;
    padding: 1rem;
    border-radius: 6px;
    background-color: #fbf9f8;
  }
  .time {
    margin-bottom: 1rem;
    color: rgba(1, 22, 56, 0.5);
    font-size: 0.8rem;
    text-align: right;
  }
</style>

<section class="question">
  <div class="time">{formatDate(question.createdAt, true)}</div>
  <h3>{@html parseMD(question.question)}</h3>
</section>