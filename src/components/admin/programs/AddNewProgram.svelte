<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { PROGRAMS, ADD_PROGRAM } from 'graphql/queries/admin/programs';
  import TextInput from 'components/forms/TextInput.svelte';
  import Button from 'components/forms/Button.svelte';

  const { session } = stores();
  
  const addProgram = mutation(ADD_PROGRAM);

  let programName;
  let formDisabled = false;
  
  $: buttonVariant = formDisabled ? 'loading' : '';

  const handleSubmit = async e => {
    formDisabled = true;

    try {
      await addProgram({
        variables: {
          title: programName
        },
        update: (_, mutationResult) => {
          const programs = $session.apolloClient.readQuery({ query: PROGRAMS }).programs;

          $session.apolloClient.writeQuery({
            query: PROGRAMS,
            data: {
              programs: [...programs, mutationResult.data.addProgram]
            }
          });
        }
      });

      programName = '';
      formDisabled = false;
    } catch(err) {
      formDisabled = false;
      console.log('ERROR: ', err);
    }
  }
</script>

<style lang="scss">
  @use '../../../styles/partials/admin';
  .form-element {
    &.add-program {
      @extend %create-entity-form-elements;
    }
  }
</style>

<form action="/add-program" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element add-program">
    <div class="input-wrapper">
      <TextInput
        id="program"
        type="text"
        label="Program Name"
        bind:value={programName}
        required
        disabled={formDisabled}
      />
    </div>
    <Button
      type="submit"
      variant={buttonVariant}
      icon="📖"
      label="Create"
    />
  </div>
</form>