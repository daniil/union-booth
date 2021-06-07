<script>
  import { parseMD } from 'utils/markdown';
  import Avatar from 'components/Avatar.svelte';
  import { formatDate, formatTime } from 'utils/time';

  export let details;

  $: content = parseMD(details.answer);
  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
</script>

<style lang="scss">
  .answer {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  .answer-text {
    flex-grow: 1;
  }
  h4 {
    margin-bottom: 1rem;
    > :global(p) {
      margin-top: 0;
    }
  }
  time {
    display: flex;
    justify-content: space-between;
    color: rgba(1, 22, 56, 0.75);
    font-size: 0.8rem;
  }
</style>

<div class="answer">
  <Avatar
    user={details.user}
    alt={`Posted by: ${details.user.firstName} ${details.user.lastName}`}
  />
  <div class="answer-text">
    <h4>{@html content}</h4>
    <time>
      <span>{time}</span>
      <span>{date}</span>
    </time>
  </div>
</div>
