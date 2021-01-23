<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { PROGRAMS, TOGGLE_PROGRAM_SELECT, SELECTED_PROGRAM } from './_queries';

  export let details;

  const { session } = stores();

  const toggleProgramSelect = mutation(TOGGLE_PROGRAM_SELECT);

  const handleActiveChange = async e => {
    await toggleProgramSelect({
      variables: {
        id: details.id,
        isSelected: e.target.checked
      },
      update: (_, mutationResult) => {
        const toggledProgram = mutationResult.data.toggleProgramSelect;

        $session.apolloClient.writeQuery({
          query: SELECTED_PROGRAM,
          data: {
            selectedProgram: toggledProgram.isSelected ? toggledProgram : null
          }
        });

        const programs = $session.apolloClient.readQuery({ query: PROGRAMS }).programs;
        
        $session.apolloClient.writeQuery({
          query: PROGRAMS,
          data: {
            programs: programs.map(program => {
              return program.id === toggledProgram.id ? toggledProgram : { ...program, isSelected: false };
            })
          }
        });
      }
    });
  }
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0.25rem 0.5rem;
  }
  .wrapper.isActive {
    background-color: rgba(212, 224, 155, 0.5);
    border: 1px solid rgb(212, 224, 155);
    border-radius: 4px;
  }
  h4 {
    margin-bottom: 0;
  }
</style>

<form action="update-program" method="post">
  <div class="wrapper" class:isActive={details.isSelected}>
    <h4>{details.title}</h4>
    <div class="form-element">
      <input
        type="checkbox"
        name="is-active-{details.id}"
        id="is-active-{details.id}"
        checked={details.isSelected}
        on:change={handleActiveChange}>
      <label for="is-active-{details.id}">Active</label>
    </div>
  </div>
</form>

