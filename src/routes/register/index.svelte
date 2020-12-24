<script>
  const handleRegister = async function(e) {
    try {
      const res = await fetch('register/register.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value
        })
      });
      const newUser = await res.json();

      console.log('Done', newUser);
    } catch(err) {
      console.log('Error', err);
    }
  }
</script>

<form action="register" method="post" on:submit|preventDefault={handleRegister}>
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