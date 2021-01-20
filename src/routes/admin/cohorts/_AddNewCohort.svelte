<script>
  import { mutation } from 'svelte-apollo';
  import { createEventDispatcher } from 'svelte';
  import { ADD_COHORT } from './_queries';

  const addCohort = mutation(ADD_COHORT);
  const dispatch = createEventDispatcher();

  let programEl;
  let cohortEl;

  export let programs;

  const handleSubmit = async e => {
    try {
      const cohort = await addCohort({
        variables: {
          programId: e.target.program.value,
          title: e.target.cohort.value
        }
      });
      dispatch('cohort-added', { cohort: cohort.data.addCohort });
      programEl.value = '';
      cohortEl.value = '';
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<form action="/add-cohort" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="program">Program: </label>
    <select bind:this={programEl} name="program" id="program">
      <option value="">- Select -</option>
      {#each programs as program (program.id)}
        <option value={program.id}>
          {program.title}
        </option>
      {/each}
    </select>
  </div>
  <div class="form-element">
    <label for="cohort">Cohort Name: </label>
    <input bind:this={cohortEl} type="text" name="cohort" id="cohort" placeholder="Cohort Name" required>
  </div>
  <div class="form-element">
    <input type="submit" value="Create">
  </div>
</form>