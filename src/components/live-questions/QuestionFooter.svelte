<script>
  import { format } from 'timeago.js';
  import { formatDate, formatTime } from 'utils/time';
  import Avatar from 'components/shared/Avatar.svelte';

  export let details;

  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
  $: lastUpdated = format(details.updatedAt, 'en_US');
</script>

<style lang="scss">
  .meta {
    display: flex;
    align-items: center;
  }
  .time-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  time {
    display: flex;
    flex: 1;
    justify-content: space-between;
    color: rgba(1, 22, 56, 0.75);
    font-size: 0.8rem;
    @media (min-width: 48rem) {
      font-size: 0.9rem;
    }
  }
  .last-updated {
    display: none;
    margin-left: 1rem;
    opacity: 0.75;
    font-size: 0.65rem;
    font-style: italic;
    text-align: right;
    @media (min-width: 48rem) {
      display: inline;
      font-size: 0.75rem;
      text-align: left;
    }
    &.mobile {
      display: block;
      @media (min-width: 48rem) {
        display: none;
      }
    }
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
  <div class="time-container">
    <time>
      <span>
        {time}
        {#if details.createdAt !== details.updatedAt}
          <span class="last-updated">Last updated {lastUpdated}</span>
        {/if}
      </span>
      <span>{date}</span>
    </time>
    {#if details.createdAt !== details.updatedAt}
      <span class="last-updated mobile">Last updated {lastUpdated}</span>
    {/if}
  </div>
</footer>