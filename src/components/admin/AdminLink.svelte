<script>
  export let href;
  export let title;
</script>

<style lang="scss">
  a {
    display: block;
    text-decoration: none;
    color: #05668D;
    &:hover {
      filter: brightness(1.25);
    }
  }
  h4 {
    display: inline-block;
    padding-bottom: 0.2rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    line-height: 1.5;
    @media (min-width: 48rem) {
      font-size: 1rem;
    }
  }
</style>

<a href={href}>
  <h4>{title}</h4>
</a>