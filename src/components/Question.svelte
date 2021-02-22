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
  .meta {
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 30px;
    margin-right: 1rem;
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
    <img
      class="avatar"
      src={`avatars/${details.user.id}.svg`}
      alt={`Posted by: ${details.user.username}`}
      title={`Posted by: ${details.user.username}`}
    />
    <time>
      <span>{date}</span>
      <span>{time}</span>
    </time>
  </footer>
</article>
