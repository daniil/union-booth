<script>
  import { mutation } from 'svelte-apollo';
  import { UPDATE_USER_PASSWORD } from 'graphql/queries/user';
  import FormErrors from 'components/FormErrors.svelte';
  import TextInput from 'components/TextInput.svelte';
  import Button from 'components/Button.svelte';

  export let user;

  const updateUserPassword = mutation(UPDATE_USER_PASSWORD);

  let password;
  let passwordConfirm;
  let errors;
  let formDisabled = false;

  $: buttonVariant = formDisabled ? 'loading' : 'success';

  const handleUpdate = async e => {
    if (password !== passwordConfirm) {
      errors = '⚠️ Passwords do not match';
      return;
    }

    try {
      formDisabled = true;

      await updateUserPassword({
        variables: {
          userId: user.id,
          password: password
        }
      });

      formDisabled = false;
      password = '';
      passwordConfirm = '';
    } catch(err) {
      formDisabled = true;
      errors = '⚠️ Could not update the password';
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
      <TextInput id="password" type="password" label="New Password" bind:value={password} required disabled={formDisabled}/>
    </div>
    <div class="form-element">
      <TextInput id="passwordConfirm" type="password" label="Confirm Password" bind:value={passwordConfirm} required disabled={formDisabled}/>
    </div>
    <div class="form-element action">
      <Button type="submit" variant={buttonVariant} icon="🪄" label="Update"/>
    </div>
  </form>
</div>
<div class="error-wrapper">
  <FormErrors {errors}/>
</div>