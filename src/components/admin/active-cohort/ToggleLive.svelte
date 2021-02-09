<script>
  export let selectedCohort;
  export let details;

  const handleLiveChange = e => {
    console.log('Live: ', e.target.checked);
  }
</script>

<style>
  .form-element {
    margin-left: 1rem;
  }
  input:disabled + label {
    opacity: 0.5;
  }
</style>

<div class="form-element">
  <input
    type="checkbox"
    name="is-live-{details.topic.id}"
    id="is-live-{details.topic.id}"
    checked={details.isLive}
    disabled={!details.isUnlocked}
    on:change={handleLiveChange}>
  <label for="is-live-{details.topic.id}">Live</label>
</div>
