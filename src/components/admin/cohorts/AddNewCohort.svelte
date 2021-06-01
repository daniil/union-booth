<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT, COHORTS } from 'graphql/queries/admin/cohorts';
  import TextInput from 'components/TextInput.svelte';
  import Button from 'components/Button.svelte';
  
  export let selectedProgram;

  const { session } = stores();
  
  const addCohort = mutation(ADD_COHORT);

  let cohortName;
  let formDisabled = false;

  $: buttonVariant = formDisabled ? 'loading' : '';

  const handleSubmit = async e => {
    formDisabled = true;

    try {
      await addCohort({
        variables: {
          programId: selectedProgram.id,
          title: cohortName
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
      
      cohortName = '';
      formDisabled = false;
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<style>
  .form-element {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .input-wrapper {
    width: 75%;
  }
</style>

<form action="/add-cohort" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <div class="input-wrapper">
      <TextInput
        id="cohort"
        type="text"
        label="Cohort Name"
        bind:value={cohortName}
        required
        disabled={formDisabled}
      />
    </div>
    <Button
      type="submit"
      variant={buttonVariant}
      icon="👥"
      label="Create"
    />
  </div>
</form>