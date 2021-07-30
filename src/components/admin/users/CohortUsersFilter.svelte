<script>
  export let value = 'active';
</script>

<style lang="scss">
  .users-filter {
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
    &.active {
      opacity: 1;
    }
  }
</style>

<form action="/filter-users" method="post" class="users-filter">
  <span class="title">Filter users by: </span>
  <div class="form-elements">
    <div class="form-element" class:active={value === 'active'}>
      <input type="radio" name="status" bind:group={value} id="active" value="active"/>
      <label for="active">Active</label>
    </div>
    <div class="form-element" class:active={value === 'inactive'}>
      <input type="radio" name="status" bind:group={value} id="inactive" value="inactive"/>
      <label for="inactive">Inactive</label>
    </div>
    <div class="form-element" class:active={value === 'all'}>
      <input type="radio" name="status" bind:group={value} id="all" value="all"/>
      <label for="all">All</label>
    </div>
  </div>
</form>