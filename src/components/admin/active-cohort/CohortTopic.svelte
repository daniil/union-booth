<script>
  export let details;

  const handleUnlockedChange = e => {
    isUnlocked = e.target.checked;
  }

  $: isUnlocked = false;
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0.25rem 0.5rem;
  }
  .wrapper {
    opacity: 0.6;
  }
  .wrapper h4 {
    color: #554348;
  }
  .wrapper.is-unlocked {
    opacity: 1;
  }
  .wrapper.is-unlocked h4 {
    color: #333;
  }
</style>

<form action="update-cohort-topic" method="post">
  <div class="wrapper" class:is-unlocked={isUnlocked}>
    <h4>{details.title}</h4>
    <div class="form-element">
      <input
        type="checkbox"
        name="is-unlocked-{details.id}"
        id="is-unlocked-{details.id}"
        on:change={handleUnlockedChange}>
      <label for="is-unlocked-{details.id}">Unlocked</label>
    </div>
  </div>
</form>