<script>
  export let value = 'linksOnly';
</script>

<style lang="scss">
  @use '../../../styles/partials/admin';
  .resources-view-filter {
    @extend %filter-radio-form;
  }
</style>

<form action="/change-resource-view" method="post" class="resources-view-filter">
  <span class="title">Resources Display Type: </span>
  <div class="form-elements">
    <div class="form-element" class:active={value === 'linksOnly'}>
      <input type="radio" name="status" bind:group={value} id="linksOnly" value="linksOnly"/>
      <label for="linksOnly">Links Only</label>
    </div>
    <div class="form-element" class:active={value === 'expanded'}>
      <input type="radio" name="status" bind:group={value} id="expanded" value="expanded"/>
      <label for="expanded">Expanded</label>
    </div>
  </div>
</form>