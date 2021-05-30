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
    > h4 {
      display: inline-block;
      padding-bottom: 0.2rem;
      font-weight: 500;
    }
  }
  h4 {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }
</style>

<a href={href}>
  <h4>{title}</h4>
</a>