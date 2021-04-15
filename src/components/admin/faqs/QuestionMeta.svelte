<script>
  import { formatDate } from 'utils/time';

  export let cohort;
  export let timestamp;
</script>

<style>
  .meta {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    color: rgba(1, 22, 56, 0.5);
    font-size: 0.8rem;
  }
</style>

<div class="meta">
  {#if timestamp}
    <span class="time">{formatDate(timestamp)}</span>
  {/if}
  {#if cohort}
    <span class="cohort">{cohort}</span>
  {/if}
</div>