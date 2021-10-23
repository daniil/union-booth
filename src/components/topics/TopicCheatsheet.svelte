<script>
  import { parseMD } from 'utils/markdown';

  export let topic;
</script>

<style lang="scss">
  .topic-cheatsheet {
    margin-bottom: 3rem;
    border-bottom: 2px solid rgba(222, 207, 222, 0.5);
    background-color: rgba(222, 207, 222, 0.15);
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
    line-height: 1.5;
    @media (min-width: 48rem) {
      font-size: 1.17rem;
    }
  }
</style>

<div class="topic-cheatsheet">
  <h2>Key Concepts</h2>
  <h3>{@html parseMD(topic.cheatsheet)}</h3>
</div>