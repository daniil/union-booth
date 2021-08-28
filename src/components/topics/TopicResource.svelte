<script>
  import { parseMD } from 'utils/markdown';

  export let resource;
</script>

<style lang="scss">
  .resource {
    margin-bottom: 2rem;
  }
  a {
    display: block;
    text-decoration: none;
    color: #05668F;
    &:hover {
      filter: brightness(1.25);
    }
  }
  h3 {
    font-size: 1.05rem;
    font-weight: 500;
    @media (min-width: 48rem) {
      font-size: 1.25rem;
    }
  }
  h4 {
    margin-left: 1rem;
    font-size: 0.9rem;
    color: rgba(85, 67, 72, 0.9);
  }
</style>

<article class="resource">
  <a href={resource.url} target="_blank">
    <h3>{resource.title}</h3>
  </a>
  {#if resource.description}
    <h4>{@html parseMD(resource.description)}</h4>
  {/if}
</article>