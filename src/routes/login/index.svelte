<svelte:head>
	<title>Union Booth :: Login</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { LOGIN } from './_queries';

  const { session } = stores();

  const loginUser = mutation(LOGIN);

  const handleLogin = async function(e) {
    try {
      const user = await loginUser({
        variables: {
          login: e.target.email.value,
          password: e.target.password.value
        }
      });
      $session.user = user.data;
      goto('/');
    } catch(err) {
      // TODO: Do an actual validation for errors
      console.log(err);
    }
  }
</script>

<form action="/login" method="post" on:submit|preventDefault={handleLogin}>
  <div class="form-element">
    <label for="email">Email: </label>
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