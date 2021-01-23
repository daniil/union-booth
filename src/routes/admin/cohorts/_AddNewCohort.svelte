<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT, COHORTS } from './_queries';
  
  export let selectedProgram;

  const { session } = stores();
  
  const addCohort = mutation(ADD_COHORT);

  let cohortEl;

  const handleSubmit = async e => {
    try {
      await addCohort({
        variables: {
          programId: selectedProgram.id,
          title: e.target.cohort.value
        },
        update: (_, mutationResult) => {
          const cohorts = $session.apolloClient.readQuery({
            query: COHORTS,
            variables: {
              programId: selectedProgram.id
            }
          }).cohorts;
          $session.apolloClient.writeQuery({
            query: COHORTS,
            variables: {
              programId: selectedProgram.id
            },
            data: {
              cohorts: [...cohorts, mutationResult.data.addCohort]
            }
          });
        }
      });
      cohortEl.value = '';
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<style>
  .program-title {
    margin-bottom: 0;
  }
</style>

<form action="/add-cohort" method="post" on:submit|preventDefault={handleSubmit}>
  <p class="program-title">Program: <strong>{selectedProgram.title}</strong></p>
  <div class="form-element">
    <label for="cohort">Cohort Name: </label>
    <input bind:this={cohortEl} type="text" name="cohort" id="cohort" placeholder="Cohort Name" required>
  </div>
  <div class="form-element">
    <input type="submit" value="Create">
  </div>
</form>