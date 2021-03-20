<script>
  import { formatDate, formatTime } from 'utils/time';
  import Avatar from 'components/Avatar.svelte';

  export let details;

  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
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
</style>

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