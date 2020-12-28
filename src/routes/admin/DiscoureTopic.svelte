<script>
  import { createEventDispatcher } from 'svelte';
  import { put } from '../../utils/request';

  export let details;

  const dispatch = createEventDispatcher();

  const handleActiveChange = async e => {
    const res = await put(`/admin/toggle-discourse-active/${details.id}.json`, {
      isActive: e.target.checked
    });
    if (!res.error) {
      dispatch('topic-updated');
    }
  }
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0.25rem 0.5rem;
  }
  .wrapper.is-live {
    background-color: rgba(212, 224, 155, 0.5);
    border: 1px solid rgb(212, 224, 155);
    border-radius: 4px;
  }
  h3 {
    margin-bottom: 0;
  }
</style>

<form action="update-topic" method="post">
  <div class="wrapper" class:is-live={details.isActive}>
    <h3>{details.topic}</h3>
    <div class="form-element">
      <input
        type="checkbox"
        name="is-active-{details.id}"
        id="is-active-{details.id}"
        checked={details.isActive}
        on:change={handleActiveChange}>
      <label for="is-active-{details.id}">Live</label>
    </div>
  </div>
</form>

