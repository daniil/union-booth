<script>
  import { stores } from '@sapper/app';

  export let details;

  const { session } = stores();

  // TODO: this wouldn't work with page refresh and the SSR fetch, so needs to be refactored to use server-side session or DB
  const handleActiveChange = () => {
    $session.activeProgram = details;
  }

  $: isActive = $session.activeProgram && details.id === $session.activeProgram.id;
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
  <div class="wrapper" class:isActive={isActive}>
    <h4>{details.title}</h4>
    <div class="form-element">
      <input
        type="checkbox"
        name="is-active-{details.id}"
        id="is-active-{details.id}"
        checked={isActive}
        on:change={handleActiveChange}>
      <label for="is-active-{details.id}">Active</label>
    </div>
  </div>
</form>

