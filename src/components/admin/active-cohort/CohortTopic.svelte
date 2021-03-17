<script>
  import ToggleUnlocked from 'components/admin/active-cohort/ToggleUnlocked.svelte';
  import ToggleLive from 'components/admin/active-cohort/ToggleLive.svelte';

  export let selectedCohort;
  export let details;
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0.5rem;
    opacity: 0.6;
  }
  .wrapper h4 {
    margin-bottom: 0;
    color: #554348;
  }
  .wrapper.is-unlocked {
    opacity: 1;
  }
  .wrapper.is-unlocked h4 {
    color: #333;
  }
  .wrapper.is-live {
    background-color: rgba(212, 224, 155, 0.5);
    border: 1px solid rgb(212, 224, 155);
    border-radius: 4px;
  }
  .status-toggles {
    display: flex;
  }
</style>

<form action="update-cohort-topic" method="post">
  <div
    class="wrapper"
    class:is-unlocked={details.isUnlocked}
    class:is-live={details.isLive}
  >
    <h4>{details.topic.title}</h4>
    <div class="status-toggles">
      <ToggleUnlocked
        {selectedCohort}
        {details}
      />
      <ToggleLive
        {selectedCohort}
        {details}
      />
    </div>
  </div>
</form>