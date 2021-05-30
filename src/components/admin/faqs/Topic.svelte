<script>
  export let topic;
</script>

<style lang="scss">
  a {
    display: block;
    text-decoration: none;
    color: #05668D;
    &:hover {
      filter: brightness(1.25);
      > h4 {
        border-color: transparent;
      }
    }
    > h4 {
      display: inline-block;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid currentColor;
      font-weight: 500;
    }
  }
  h4 {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }
</style>

<a href="/admin/faqs/{topic.slug}">
  <h4>{topic.title}</h4>
</a>