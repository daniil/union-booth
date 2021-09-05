<script>
  import ToggleUnlocked from 'components/admin/active-cohort/ToggleUnlocked.svelte';
  import ToggleLive from 'components/admin/active-cohort/ToggleLive.svelte';

  export let selectedCohort;
  export let details;
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.75rem;
    opacity: 0.6;
    &.is-unlocked {
      opacity: 1;
      h4 {
        color: #333;
      }
    }
    &.is-live {
      background-color: rgba(212, 224, 155, 0.5);
      border: 1px solid rgb(212, 224, 155);
      border-radius: 4px;
    }
    h4 {
      margin-bottom: 0.5rem;
      line-height: 1.5;
      color: #554348;
      font-size: 0.95rem;
      @media (min-width: 48rem) {
        font-size: 1rem;
      }
    }
  }
  .status-toggles {
    display: flex;
    gap: 1.5rem;
    font-size: 0.85rem;
    @media (min-width: 48rem) {
      font-size: 0.9rem;
    }
    :global(label) {
      padding-top: 1px;
      @media (min-width: 48rem) {
        padding-top: 2px;
      }
    }
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