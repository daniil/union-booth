<script>
  export let userInfo;
</script>

<style>
  p {
    margin: 0;
  }
</style>

{#if userInfo?.cohort}
  <div class="details-section">
    <p class="label">Program:</p>
    <p class="value">{userInfo.cohort.program.title}</p>
  </div>
  <div class="details-section">
    <p class="label">Cohort:</p>
    <p class="value">{userInfo.cohort.title}</p>
  </div>
{/if}