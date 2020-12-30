<script>
  import { post } from '../../utils/request';
  import { goto, stores } from "@sapper/app";

  const { session } = stores();

  const handleLogin = async function(e) {
    const user = await post('login/login.json', {
      email: e.target.email.value,
      password: e.target.password.value
    });

    if (!user.error) {
      $session.user = user.data;
      goto('/');
    } else {
      console.log('ERROR: ', user.error);
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