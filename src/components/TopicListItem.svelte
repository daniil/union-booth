<script>
  import { formatDate } from '../utils/time';

  export let details;

  $: date = formatDate(details.topic.createdAt);
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>

<article class="wrapper">
  <h2>
    <a rel="prefetch" href="/topics/{details.topic.slug}">
      {details.topic.title}
    </a>
    {#if details.isLive}🟢{/if}
  </h2>
  <time>{date}</time>
</article>
