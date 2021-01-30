<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT, COHORTS } from 'graphql/queries/admin/cohorts';
  
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

<form action="/add-cohort" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="cohort">Cohort Name: </label>
    <input bind:this={cohortEl} type="text" name="cohort" id="cohort" placeholder="Cohort Name" required>
    <input type="submit" value="Create">
  </div>
</form>