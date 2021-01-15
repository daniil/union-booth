<script>
  let programEl;

  const handleSubmit = async e => {
    try {
      programEl.value = '';
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<form action="/add-program" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="topic">Program Name: </label>
    <input bind:this={programEl} type="text" name="program" id="program" placeholder="Program Name" required>
    <input type="submit" value="Create">
  </div>
</form>