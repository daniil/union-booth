<script>
  import { mutation } from 'svelte-apollo';
  import { createEventDispatcher } from 'svelte';
  import { ADD_COHORT } from './_queries';

  const addCohort = mutation(ADD_COHORT);
  const dispatch = createEventDispatcher();

  let cohortEl;

  export let selectedProgram;

  const handleSubmit = async e => {
    try {
      const cohort = await addCohort({
        variables: {
          programId: selectedProgram.id,
          title: e.target.cohort.value
        }
      });
      dispatch('cohort-added', { cohort: cohort.data.addCohort });
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