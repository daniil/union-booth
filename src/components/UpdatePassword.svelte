<script>
  import parseError from 'utils/parseError';
  import FormErrors from 'components/FormErrors.svelte';
  import TextInput from 'components/TextInput.svelte';
  import Button from 'components/Button.svelte';

  export let user;

  let errors;
  let formDisabled = false;

  $: buttonVariant = formDisabled ? 'loading' : 'success';

  const handleUpdate = e => {
    if (e.target.password.value !== e.target.passwordConfirm.value) {
      errors = '⚠️ Passwords do not match';
      return;
    }

    try {
      console.log('Value: ', e.target.password.value);
    } catch(err) {
      errors = null;
      formDisabled = true;
    }
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
  .error-wrapper {
    display: flex;
    justify-content: center;
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
<div class="error-wrapper">
  <FormErrors {errors}/>
</div>