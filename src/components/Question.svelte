<script>
  import { parseMD } from 'utils/markdown';
  import { formatDate, formatTime } from 'utils/time';
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
  .avatar {
    width: 30px;
    margin-right: 1rem;
  }
  .anon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    border-radius: 50%;
    background-color: #D3D3D3;
    color: #808080;
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
      <div class="avatar anon">?</div>
    {:else}
      <img
        class="avatar"
        src={`avatars/${details.user.id}.svg`}
        alt={`Posted by: ${details.user.username}`}
        title={`Posted by: ${details.user.username}`}
      />
    {/if}
    <time>
      <span>{time}</span>
      <span>{date}</span>
    </time>
  </footer>
  <QuestionAnswers questionId={details.id}/>
</article>
