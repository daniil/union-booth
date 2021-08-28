<script>
  import { formatDate } from 'utils/time';

  export let details;

  $: date = formatDate(details.topic.createdAt);
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: space-between;
  }
  h2 {
    margin: 0 1rem 1rem 0;
    line-height: 1.5;
    font-size: 1.25rem;
    @media (min-width: 48rem) {
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }
  }
  a {
    text-decoration: none;
    color: #05668D;
    &:hover {
      filter: brightness(1.25);
    }
  }
  .live {
    background-color: rgb(212, 224, 155);
    padding: 0.5rem 0.75rem;
    margin-left: 1rem;
    border-radius: 6px;
    color: white;
    text-shadow: 0px 1px 0 rgb(0 0 0 / 30%);
    font-size: 0.9rem;
    @media (min-width: 48rem) {
      font-size: 1rem;
    }
  }
  time {
    padding-top: 0.3rem;
    white-space: nowrap;
    color: #7D6D61;
    font-size: 0.9rem;
    @media (min-width: 48rem) {
      font-size: 1rem;
    }
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
