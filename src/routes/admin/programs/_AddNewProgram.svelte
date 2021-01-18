<script>
  import { mutation } from 'svelte-apollo';
  import { createEventDispatcher } from 'svelte';
  import { ADD_PROGRAM } from './_queries';

  const addProgram = mutation(ADD_PROGRAM);
  const dispatch = createEventDispatcher();

  let programEl;

  const handleSubmit = async e => {
    try {
      const program = await addProgram({
        variables: {
          title: e.target.program.value
        }
      });
      dispatch('program-added', { program: program.data.addProgram });
      programEl.value = '';
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<form action="/add-program" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="topic">Program Name: </label>
    <input bind:this={programEl} type="text" name="program" id="program" placeholder="Program Name" required>
    <input type="submit" value="Create">
  </div>
</form>