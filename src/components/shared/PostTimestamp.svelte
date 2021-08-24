<script>
  import { format } from 'timeago.js';
  import { formatDate, formatTime } from 'utils/time';

  export let details;
  export let reduced;

  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
  $: lastUpdated = format(details.updatedAt, 'en_US');
</script>

<style lang="scss">
  .time-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    &.reduced {
      time {
        font-size: 0.7rem;
        @media (min-width: 48rem) {
          font-size: 0.8rem;
        }
      }
      .last-updated {
        @media (min-width: 48rem) {
          font-size: 0.65rem;
        }
      }
    }
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

<div class="time-container" class:reduced>
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