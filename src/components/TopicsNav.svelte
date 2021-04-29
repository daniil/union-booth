<script>
  export let slug;
  export let segment;
</script>

<style>
  nav {
    display: flex;
  }
  [aria-current] {
    color: red;
  }
</style>

<nav>
  <ul>
    <li>
      <a rel="prefetch" aria-current="{segment === 'faqs' ? 'page' : undefined}" href={`/topics/${slug}/faqs`}>
        Frequently Asked Questions
      </a>
    </li>
    <li>
      <a rel="prefetch" aria-current="{segment === 'resources' ? 'page' : undefined}" href={`/topics/${slug}/resources`}>
        Resources
      </a>
    </li>
  </ul>
</nav>
