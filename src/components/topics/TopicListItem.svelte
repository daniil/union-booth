<script>
  import { formatDate } from 'utils/time';

  export let details;

  $: date = formatDate(details.topic.createdAt);
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
  }
  .live {
    background-color: rgb(212, 224, 155);
    padding: 0.5rem 0.75rem;
    margin-left: 1rem;
    border-radius: 6px;
    color: white;
    text-shadow: 0px 1px 0 rgb(0 0 0 / 30%);
    font-size: 1rem;
  }
</style>

<article class="wrapper">
  <h2>
    <a rel="prefetch" href="/topics/{details.topic.slug}">
      {details.topic.title}
    </a>
    {#if details.isLive}
      <span class="live">LIVE</span>
    {/if}
  </h2>
  <time>{date}</time>
</article>
