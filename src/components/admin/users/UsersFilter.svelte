<script>
  export let value = 'active';
</script>

<style lang="scss">
  @use '../../../styles/partials/admin';
  .users-filter {
    @extend %filter-radio-form;
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