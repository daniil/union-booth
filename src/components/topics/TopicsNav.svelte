<script>
  export let slug;
  export let segment;
</script>

<style lang="scss">
  nav {
    margin: 1.5rem 0 3rem;
  }
  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    flex-direction: column;
    gap: 1rem;
    @media (min-width: 48rem) {
      flex-direction: row;
      gap: 0;
    }
  }
  li {
    margin-right: 0;
    @media (min-width: 48rem) {
      margin-right: 3rem;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  a {
    display: inline-block;
    border-bottom: 2px solid transparent;
    opacity: 0.75;
    text-decoration: none;
    color: #05668D;
    &:hover {
      filter: brightness(1.25);
    }
  }
  h2 {
    margin-bottom: 0.7rem;
    font-weight: 200;
    font-size: 1.25rem;
    @media (min-width: 48rem) {
      font-size: 1.5rem;
    }
  }
  [aria-current] {
    border-bottom-color: currentColor;
    opacity: 1;
    > h2 {
      font-weight: 400;
    }
  }
</style>

<nav>
  <ul>
    <li>
      <a rel="prefetch" aria-current="{segment === 'cheatsheet' ? 'page' : undefined}" href={`/topics/${slug}/cheatsheet`}>
        <h2>Cheatsheet</h2>
      </a>
    </li>
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
