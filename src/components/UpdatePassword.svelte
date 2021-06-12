<script>
  import TextInput from 'components/TextInput.svelte';
  import Button from 'components/Button.svelte';

  export let user;

  let formDisabled = false;

  $: buttonVariant = formDisabled ? 'loading' : 'success';

  const handleUpdate = e => {
    console.log('Update');
  }
</script>

<style>
  .password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  form {
    display: flex;
    align-items: flex-end;
    gap: 2rem;
  }
</style>

<div class="password-container">
  <h2>Update Password</h2>
  <form action="/update" method="post" on:submit|preventDefault={handleUpdate}>
    <div class="form-element">
      <TextInput id="password" type="password" label="New Password" required disabled={formDisabled}/>
    </div>
    <div class="form-element">
      <TextInput id="passwordConfirm" type="password" label="Confirm Password" required disabled={formDisabled}/>
    </div>
    <div class="form-element action">
      <Button type="submit" variant={buttonVariant} icon="🪄" label="Update"/>
    </div>
  </form>
</div>
