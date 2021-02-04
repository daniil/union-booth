<script>
  import ToggleUnlocked from 'components/admin/active-cohort/ToggleUnlocked.svelte';

  export let selectedCohort;
  export let details;
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
  <div class="wrapper" class:is-unlocked={details.isUnlocked}>
    <h4>{details.topic.title}</h4>
    <div class="form-element">
      <ToggleUnlocked
        {selectedCohort}
        {details}
      />
    </div>
  </div>
</form>