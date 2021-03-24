<svelte:head>
	<title>Union Booth :: Register</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { REGISTER } from 'graphql/queries/register';
  import parseError from 'utils/parseError';
  import FormErrors from 'components/FormErrors.svelte';
  import TextInput from 'components/TextInput.svelte';
  import Button from 'components/Button.svelte';

  const { session } = stores();
  const registerUser = mutation(REGISTER);

  let errors;
  let cohortIdRequired = true;
  let cohortIdValue;

  const handleRegister = async function(e) {
    try {
      errors = null;

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
      errors = parseError(err);
    }
  }

  const toggleCohortIdField = () => {
    cohortIdRequired = !cohortIdRequired;
    cohortIdValue = '';
  }
</script>

<style>
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
  }
  .form-element.action {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid #DBD3D8;
  }
  .hidden {
    display: none;
  }
  .register-type {
    display: flex;
    align-items: center;
  }
  .register-type > label {
    margin-left: 0.5rem;
    color: #7D6D61;
    font-size: 0.9rem;
  }
</style>

<div class="container">
  <div class="wrapper">
    <h1>Register</h1>
    <form action="/register" method="post" on:submit|preventDefault={handleRegister}>
      <div class="form-element">
        <TextInput id="firstName" type="text" label="First Name" required/>
      </div>
      <div class="form-element">
        <TextInput id="lastName" type="text" label="Last Name" required/>
      </div>
      <div class="form-element">
        <TextInput id="username" type="text" label="Username" required/>
      </div>
      <div class="form-element">
        <TextInput id="email" type="email" label="Email" required/>
      </div>
      <div class="form-element">
        <TextInput id="password" type="password" label="Password" required/>
      </div>
      <div class="form-element">
        <TextInput id="passwordConfirm" type="password" label="Confirm Password" required/>
      </div>
      <div class="form-element register-type">
        <input type="checkbox" name="isProgramOwner" id="isProgramOwner" on:change={toggleCohortIdField}>
        <label for="isProgramOwner" class="inline">Register as Program Owner</label>
      </div>
      <div class="form-element" class:hidden={!cohortIdRequired}>
        <TextInput id="cohortId" type="text" label="Cohort ID" bind:value={cohortIdValue} required={cohortIdRequired}/>
      </div>
      <div class="form-element action">
        <Button type="submit" variant="success" icon="🎫" label="Register"/>
      </div>
    </form>
  </div>
</div>
<div class="container">
  <FormErrors {errors}/>
</div>