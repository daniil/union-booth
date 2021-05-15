<script>
  export let resource;
</script>

<style>
  a {
    display: block;
    text-decoration: none;
    color: #05668F;
  }
  a:hover {
    filter: brightness(1.25);
  }
  li {
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 0.3rem;
    font-weight: 500;
  }
  .url {
    font-size: 0.9rem;
    margin: 0 0 0.75rem;
  }
  .description {
    margin: 0;
    color: rgba(85, 67, 72, 0.9);
  }
</style>

<li>
  <a href={resource.url} target="_blank">
    <h3>{resource.title}</h3>
    <p class="url">{resource.url}</p>
  </a>
  <p class="description">{resource.description}</p>
</li>
