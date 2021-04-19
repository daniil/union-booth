<script>
  export let questions;
  export let value = 'nonPublished';

  $: nonPublishedCount = questions.filter(question => !question.convertedToFAQ).length;
  $: publishedCount = questions.filter(question => question.convertedToFAQ).length;
</script>

<style>
  .questions-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0 1.5rem;
  }
  .title {
    padding: 0.25rem 0.5rem;
    flex-grow: 1;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background: rgba(85, 67, 72, 0.5);
    color: #FFFDF7;
  }
  .form-elements {
    display: flex;
  }
  .form-element {
    margin-left: 1rem;
    opacity: 0.6;
    transition: opacity 0.25s;
  }
  .form-element.active {
    opacity: 1;
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