<script>
  export let userInfo;

  let details = {
    program: '',
    cohort: ''
  };

  $: getDetails(userInfo);

  const getDetails = userInfo => {
    if (!userInfo) {
      return details = {
        program: '...',
        cohort: '...'
      }
    }
    
    if (!userInfo.cohort) {
      return details = {
        program: 'N/A',
        cohort: 'N/A'
      }
    }

    return details = {
      program: userInfo.cohort.program.title,
      cohort: userInfo.cohort.title
    }
  }
</script>

<style lang="scss">
  .program-details {
    margin-bottom: 2rem;
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
    font-size: 0.9rem;
  }
</style>

<div class="program-details">
  <div class="details-section">
    <p class="label">Program</p>
    <p class="value">{details.program}</p>
  </div>
  <div class="details-section">
    <p class="label">Cohort</p>
    <p class="value">{details.cohort}</p>
  </div>
</div>
