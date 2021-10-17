<script>
  export let topic;
</script>

<style lang="scss">
  .topic-cheatsheet {
    margin-bottom: 3rem;
    background-color: rgba(222, 207, 222, 0.25);
    border-radius: 4px;
    padding: 1.25rem;
  }
  h2 {
    line-height: 1.5;
    font-size: 1.25rem;
    color: #5B3345;
    @media (min-width: 48rem) {
      font-size: 1.5rem;
    }
  }
  h3 {
    font-size: 1rem;
    @media (min-width: 48rem) {
      font-size: 1.17rem;
    }
  }
</style>

<div class="topic-cheatsheet">
  <h2>Key Concepts</h2>
  <h3>{topic.cheatsheet}</h3>
</div>