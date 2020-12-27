<script>
  import { formatDate } from '../utils/time';

  export let details;

  $: date = formatDate(details.dateCreated);
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>

<article class="wrapper">
  <a rel="prefetch" href="/discourse/{details.id}">
    <h2>
      {details.topic}
      {#if details.isActive}🟢{/if}
    </h2>
  </a>
  <time>{date}</time>
</article>
