<script>
  import { mutation } from 'svelte-apollo';
  import { UPDATE_USER_PASSWORD } from 'graphql/queries/user';
  import FormErrors from 'components/forms/FormErrors.svelte';
  import TextInput from 'components/forms/TextInput.svelte';
  import Button from 'components/forms/Button.svelte';

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

<style lang="scss">
  .password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
    @media (min-width: 48rem) {
      padding: 0;
    }
  }
  h2 {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 20rem;
    @media (min-width: 48rem) {
      align-items: flex-end;
      flex-direction: row;
      width: inherit;
      max-width: inherit;
    }
  }
  .form-element:not(.action) {
    width: 100%;
    @media (min-width: 48rem) {
      width: inherit;
    }
  }
  .error-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 6rem;
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
      <Button type="submit" variant={buttonVariant} icon="🖋️" label="Update"/>
    </div>
  </form>
</div>
<div class="error-wrapper">
  <FormErrors {errors}/>
</div>