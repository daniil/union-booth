<script>
  export let questions;
  export let value = 'nonPublished';

  $: nonPublishedCount = questions.filter(question => !question.convertedToFAQ).length;
  $: publishedCount = questions.filter(question => question.convertedToFAQ).length;
</script>

<style lang="scss">
  .questions-filter {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    margin: 0.5rem 0 1.5rem;
    @media (min-width: 48rem) {
      flex-direction: row;
      align-items: center;
    }
  }
  .title {
    width: 100%;
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.75rem;
    flex-grow: 1;
    border-radius: 4px;
    background: rgba(85, 67, 72, 0.5);
    color: #FFFDF7;
    font-size: 0.9rem;
    @media (min-width: 48rem) {
      width: auto;
      margin-bottom: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      font-size: 1rem;
    }
  }
  .form-elements {
    display: flex;
    gap: 1.5rem;
    @media (min-width: 48rem) {
      gap: 0;
    }
  }
  .form-element {
    margin-left: 0;
    opacity: 0.6;
    transition: opacity 0.25s;
    font-size: 0.9rem;
    @media (min-width: 48rem) {
      margin-left: 1rem;
      font-size: 1rem;
    }
    &.active {
      opacity: 1;
    }
  }
  .counter {
    display: inline-block;
    margin-left: 0.15rem;
    font-size: 0.75rem;
    color: rgba(85, 67, 72, 0.6);
  }
  .count {
    margin: 0 0.1rem;
    font-weight: bold;
    color: rgba(85, 67, 72, 0.75);
  }
</style>

<form action="/filter-questions" method="post" class="questions-filter">
  <span class="title">Filter questions by: </span>
  <div class="form-elements">
    <div class="form-element" class:active={value === 'nonPublished'}>
      <input type="radio" name="status" bind:group={value} id="nonPublished" value="nonPublished"/>
      <label for="nonPublished">Non-Published</label>
      <span class="counter">(<span class="count">{nonPublishedCount}</span>)</span>
    </div>
    <div class="form-element" class:active={value === 'published'}>
      <input type="radio" name="status" bind:group={value} id="published" value="published"/>
      <label for="published">Published</label>
      <span class="counter">(<span class="count">{publishedCount}</span>)</span>
    </div>
  </div>
</form>