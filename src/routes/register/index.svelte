<svelte:head>
	<title>Union Booth :: Register</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { REGISTER } from 'graphql/queries/register';
  import parseError from 'utils/parseError';
  import FormErrors from 'components/forms/FormErrors.svelte';
  import TextInput from 'components/forms/TextInput.svelte';
  import Checkbox from 'components/forms/Checkbox.svelte';
  import Button from 'components/forms/Button.svelte';

  const { session } = stores();
  const registerUser = mutation(REGISTER);

  let errors;
  let cohortIdRequired = true;
  let cohortIdValue;
  let formDisabled = false;

  $: buttonVariant = formDisabled ? 'loading' : 'success';

  const handleRegister = async function(e) {
    if (e.target.password.value !== e.target.passwordConfirm.value) {
      errors = '⚠️ Passwords do not match';
      return;
    }

    try {
      errors = null;
      formDisabled = true;

      const user = await registerUser({
        variables: {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
          isProgramOwner: e.target.isProgramOwner.checked,
          cohortId: e.target.cohortId.value
        }
      });
      
      $session.user = user.data.register;
      goto('/');
    } catch(err) {
      formDisabled = false;
      errors = parseError(err);
    }
  }

  const toggleCohortIdField = () => {
    cohortIdRequired = !cohortIdRequired;
    cohortIdValue = '';
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
  }
  h1 {
    text-align: center;
    font-size: 1.5rem;
    color: rgba(0,0,0,0.7);
  }
  .form-element {
    margin-bottom: 1rem;
    &.action {
      display: flex;
      justify-content: center;
      padding-top: 1rem;
      border-top: 1px solid #DBD3D8;
    }
  }
  .hidden {
    display: none;
  }
</style>

<div class="container">
  <div class="wrapper">
    <h1>Register</h1>
    <form action="/register" method="post" on:submit|preventDefault={handleRegister}>
      <div class="form-element">
        <TextInput id="firstName" type="text" label="First Name" required disabled={formDisabled}/>
      </div>
      <div class="form-element">
        <TextInput id="lastName" type="text" label="Last Name" required disabled={formDisabled}/>
      </div>
      <div class="form-element">
        <TextInput id="username" type="text" label="Username" required disabled={formDisabled}/>
      </div>
      <div class="form-element">
        <TextInput id="email" type="email" label="Email" required disabled={formDisabled}/>
      </div>
      <div class="form-element">
        <TextInput id="password" type="password" label="Password" required disabled={formDisabled}/>
      </div>
      <div class="form-element">
        <TextInput id="passwordConfirm" type="password" label="Confirm Password" required disabled={formDisabled}/>
      </div>
      <div class="form-element">
        <Checkbox id="isProgramOwner" label="Register as Program Owner" on:change={toggleCohortIdField} disabled={formDisabled}/>
      </div>
      <div class="form-element" class:hidden={!cohortIdRequired}>
        <TextInput id="cohortId" type="text" label="Cohort ID" bind:value={cohortIdValue} required={cohortIdRequired} disabled={formDisabled}/>
      </div>
      <div class="form-element action">
        <Button type="submit" variant={buttonVariant} icon="🎫" label="Register"/>
      </div>
    </form>
  </div>
</div>
<div class="container">
  <FormErrors {errors}/>
</div>