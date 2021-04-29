<script>
  export let slug;
  export let segment;
</script>

<style>
  nav {
    margin: 1.5rem 0 3rem;
  }
  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li {
    margin-right: 3rem;
  }
  li:last-child {
    margin-right: 0;
  }
  a {
    display: inline-block;
    border-bottom: 2px solid transparent;
    opacity: 0.75;
    text-decoration: none;
    color: #05668D;
  }
  a:hover {
    filter: brightness(1.25);
  }
  h2 {
    margin-bottom: 0.7rem;
    font-weight: 200;
  }
  [aria-current] {
    border-bottom-color: currentColor;
    opacity: 1;
  }
  [aria-current] > h2 {
    font-weight: 400;
  }
</style>

<nav>
  <ul>
    <li>
      <a rel="prefetch" aria-current="{segment === 'faqs' ? 'page' : undefined}" href={`/topics/${slug}/faqs`}>
        <h2>Frequently Asked Questions</h2>
      </a>
    </li>
    <li>
      <a rel="prefetch" aria-current="{segment === 'resources' ? 'page' : undefined}" href={`/topics/${slug}/resources`}>
        <h2>Resources</h2>
      </a>
    </li>
  </ul>
</nav>
