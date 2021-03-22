<svelte:head>
	<title>Union Booth :: Register</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { REGISTER } from 'graphql/queries/register';
  import parseError from 'utils/parseError';
  import FormErrors from 'components/FormErrors.svelte';
  import Button from 'components/Button.svelte';

  const { session } = stores();
  const registerUser = mutation(REGISTER);

  let errors;
  let cohortIdRequired = true;
  let cohortIdEl;

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
    cohortIdEl.value = null;
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
  label:not(.inline) {
    display: block;
  }
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
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
        <label for="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" placeholder="First Name" required>
      </div>
      <div class="form-element">
        <label for="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" placeholder="Last Name" required>
      </div>
      <div class="form-element">
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="Username" required>
      </div>
      <div class="form-element">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" required>
      </div>
      <div class="form-element">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Password" required>
      </div>
      <div class="form-element">
        <label for="passwordConfirm">Confirm Password</label>
        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm Password" required>
      </div>
      <div class="form-element">
        <input type="checkbox" name="isProgramOwner" id="isProgramOwner" on:change={toggleCohortIdField}>
        <label for="isProgramOwner" class="inline">Register as Program Owner</label>
      </div>
      <div class="form-element" class:hidden={!cohortIdRequired}>
        <label for="cohortId">Cohort ID</label>
        <input bind:this={cohortIdEl} type="text" name="cohortId" id="cohortId" placeholder="Cohort ID" required={cohortIdRequired}>
      </div>
      <div class="form-element action">
        <Button type="submit" icon="🎫" label="Register"/>
      </div>
    </form>
    <FormErrors {errors}/>
  </div>
</div>