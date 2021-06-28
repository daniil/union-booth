<script>
  import { format } from 'timeago.js';
  import { formatDate, formatTime } from 'utils/time';
  import Avatar from 'components/Avatar.svelte';

  export let details;

  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
  $: lastUpdated = format(details.updatedAt, 'en_US');
</script>

<style>
  .meta {
    display: flex;
    align-items: center;
  }
  time {
    display: flex;
    flex: 1;
    justify-content: space-between;
    color: rgba(1, 22, 56, 0.75);
    font-size: 0.9rem;
  }
  .last-updated {
    margin-left: 1rem;
    opacity: 0.75;
    font-size: 0.75rem;
    font-style: italic;
  }
</style>

<footer class="meta">
  {#if details.isAnonymous}
    <Avatar/>
  {:else}
    <Avatar
      user={details.user}
      alt={`Posted by: ${details.user.firstName} ${details.user.lastName}`}
    />
  {/if}
  <time>
    <span>
      {time}
      {#if details.createdAt !== details.updatedAt}
        <span class="last-updated">Last updated {lastUpdated}</span>
      {/if}
    </span>
    <span>{date}</span>
  </time>
</footer>