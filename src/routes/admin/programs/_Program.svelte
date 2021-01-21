<script>
  import { mutation } from 'svelte-apollo';
  import { createEventDispatcher } from 'svelte';
  import { TOGGLE_PROGRAM_SELECT } from './_queries';

  export let details;

  const toggleProgramSelect = mutation(TOGGLE_PROGRAM_SELECT);
  const dispatch = createEventDispatcher();

  const handleActiveChange = async e => {
    const program = await toggleProgramSelect({
      variables: {
        id: details.id,
        isSelected: e.target.checked
      }
    });
    dispatch('program-selected', { program: program.data.toggleProgramSelect });
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

