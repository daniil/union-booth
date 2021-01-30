<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { PROGRAMS, ADD_PROGRAM } from 'graphql/queries/admin/programs';

  const { session } = stores();
  
  const addProgram = mutation(ADD_PROGRAM);

  let programEl;

  const handleSubmit = async e => {
    try {
      await addProgram({
        variables: {
          title: e.target.program.value
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

      programEl.value = '';
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<form action="/add-program" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="program">Program Name: </label>
    <input bind:this={programEl} type="text" name="program" id="program" placeholder="Program Name" required>
    <input type="submit" value="Create">
  </div>
</form>