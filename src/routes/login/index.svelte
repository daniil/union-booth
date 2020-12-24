<script>
  const handleLogin = async function(e) {
    try {
      const res = await fetch('login/login.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value
        })
      });
      const user = await res.json();

      console.log('Done', user);
    } catch(err) {
      console.log('Error', err);
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
  <div class="form-example">
    <input type="submit" value="Login">
  </div>
</form>