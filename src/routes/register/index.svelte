<script>
  import { post } from '../../utils/request';
  import { goto, stores } from '@sapper/app';
  const { session } = stores();

  const handleRegister = async function(e) {
    const newUser = await post('register/register.json', {
      email: e.target.email.value,
      password: e.target.password.value
    });

    if (!newUser.error) {
      $session.user = newUser.data;
      goto('/');
    } else {
      console.log('ERROR: ', newUser.error);
    }
  }
</script>

<form action="/register" method="post" on:submit|preventDefault={handleRegister}>
  <div class="form-element">
    <label for="email">Email: </label>
    <input type="text" name="email" id="email" placeholder="Email" required>
  </div>
  <div class="form-element">
    <label for="password">Password: </label>
    <input type="password" name="password" id="password" placeholder="Password" required>
  </div>
  <div class="form-element">
    <label for="password-confirm">Confirm Password: </label>
    <input type="password" name="password-confirm" id="password-confirm" placeholder="Confirm Password" required>
  </div>
  <div class="form-example">
    <input type="submit" value="Register">
  </div>
</form>