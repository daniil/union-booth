<svelte:head>
	<title>Union Booth :: Login</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { LOGIN } from './_queries';
  import parseError from '../../utils/parseError';
  import FormErrors from '../../components/FormErrors.svelte';

  const { session } = stores();
  const loginUser = mutation(LOGIN);

  let errors;

  const handleLogin = async function(e) {
    try {
      errors = null;

      const user = await loginUser({
        variables: {
          login: e.target.email.value,
          password: e.target.password.value
        }
      });
      $session.user = user.data.login;
      goto('/');
    } catch(err) {
      errors = parseError(err);
    }
  }
</script>

<form action="/login" method="post" on:submit|preventDefault={handleLogin}>
  <div class="form-element">
    <label for="email">Email or Username: </label>
    <input type="text" name="email" id="email" placeholder="Email" required>
  </div>
  <div class="form-element">
    <label for="password">Password: </label>
    <input type="password" name="password" id="password" placeholder="Password" required>
  </div>
  <div class="form-element">
    <input type="submit" value="Login">
  </div>
</form>
<FormErrors {errors}/>