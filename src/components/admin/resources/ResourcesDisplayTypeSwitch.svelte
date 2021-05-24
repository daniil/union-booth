<script>
  export let value = 'linksOnly';
</script>

<style>
  .resources-view-filter {
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