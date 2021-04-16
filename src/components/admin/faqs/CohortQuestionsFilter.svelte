<script>
  export let value = 'nonPublished';
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
</style>

<form action="/filter-questions" method="post" class="questions-filter">
  <span class="title">Filter questions by: </span>
  <div class="form-elements">
    <div class="form-element" class:active={value === 'nonPublished'}>
      <input type="radio" name="status" bind:group={value} id="nonPublished" value="nonPublished"/>
      <label for="nonPublished">Non-Published</label>
    </div>
    <div class="form-element" class:active={value === 'published'}>
      <input type="radio" name="status" bind:group={value} id="published" value="published"/>
      <label for="published">Published</label>
    </div>
  </div>
</form>