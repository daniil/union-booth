<script>
  import { parseMD } from 'utils/markdown';
  import { formatDate, formatTime } from 'utils/time';
  import Avatar from 'components/Avatar.svelte';
  import QuestionAnswers from 'components/QuestionAnswers.svelte';

  export let details;

  $: content = parseMD(details.question);
  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
</script>

<style>
  .question {
    position: relative;
    padding: 1rem;
    border: 1px solid #DBD3D8;
    border-bottom-width: 2px;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  h3 > :global(p) {
    margin-top: 0;
  }
  .meta {
    display: flex;
    align-items: center;
  }
  time {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
</style>

<article class="question">
  <h3>{@html content}</h3>
  <footer class="meta">
    {#if details.isAnonymous}
      <Avatar/>
    {:else}
      <Avatar user={details.user}/>
    {/if}
    <time>
      <span>{time}</span>
      <span>{date}</span>
    </time>
  </footer>
  <QuestionAnswers questionId={details.id}/>
</article>
