<svelte:head>
	<title>Union Booth :: Register</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { REGISTER } from './_queries';
  import parseError from '../../utils/parseError';
  import FormErrors from '../../components/FormErrors.svelte';

  const { session } = stores();
  const registerUser = mutation(REGISTER);

  let errors;

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
          isProgramOwner: e.target.isProgramOwner.checked
        }
      });
      $session.user = user.data.register;
      goto('/');
    } catch(err) {
      errors = parseError(err);
    }
  }
</script>

<form action="/register" method="post" on:submit|preventDefault={handleRegister}>
  <div class="form-element">
    <label for="firstName">First Name: </label>
    <input type="text" name="firstName" id="firstName" placeholder="First Name" required>
  </div>
  <div class="form-element">
    <label for="lastName">Last Name: </label>
    <input type="text" name="lastName" id="lastName" placeholder="Last Name" required>
  </div>
  <div class="form-element">
    <label for="username">Username: </label>
    <input type="text" name="username" id="username" placeholder="Username" required>
  </div>
  <div class="form-element">
    <label for="email">Email: </label>
    <input type="text" name="email" id="email" placeholder="Email" required>
  </div>
  <div class="form-element">
    <label for="password">Password: </label>
    <input type="password" name="password" id="password" placeholder="Password" required>
  </div>
  <div class="form-element">
    <label for="passwordConfirm">Confirm Password: </label>
    <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm Password" required>
  </div>
  <div class="form-element">
    <input type="checkbox" name="isProgramOwner" id="isProgramOwner">
    <label for="isProgramOwner">Register as Program Owner</label>
  </div>
  <div class="form-element">
    <input type="submit" value="Register">
  </div>
</form>
<FormErrors {errors}/>