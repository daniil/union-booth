<script>
  export let userInfo;
</script>

<style lang="scss">
  .program-details {
    width: 100%;
    max-width: 20rem;
    margin: 3rem auto 0;
    @media (min-width: 48rem) {
      margin-top: 1.5rem;
    }
  }
  .details-section:not(:last-child) {
    margin-bottom: 0.75rem;
  }
  p {
    margin: 0;
  }
  .label {
    margin-bottom: 0.25rem;
    color: #7D6D61;
    font-size: 0.8rem;
  }
  .value {
    font-size: 0.85rem;
  }
</style>

{#if userInfo?.cohort}
  <div class="program-details">
    <div class="details-section">
      <p class="label">Program:</p>
      <p class="value">{userInfo.cohort.program.title}</p>
    </div>
    <div class="details-section">
      <p class="label">Cohort:</p>
      <p class="value">{userInfo.cohort.title}</p>
    </div>
  </div>
{/if}