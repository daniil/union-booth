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
  <h2>
    <a rel="prefetch" href="/discourse/{details.id}">
      {details.topic}
    </a>
    {#if details.isActive}🟢{/if}
  </h2>
  <time>{date}</time>
</article>
