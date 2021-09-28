<script>
  export let questions;
  export let value = 'nonPublished';

  $: nonPublishedCount = questions.filter(question => !question.convertedToFAQ).length;
  $: publishedCount = questions.filter(question => question.convertedToFAQ).length;
</script>

<style lang="scss">
  @use '../../../styles/partials/admin';
  .questions-filter {
    @extend %filter-radio-form;
  }
  .counter {
    display: inline-block;
    margin-left: 0.25rem;
    padding-top: 0.1rem;
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