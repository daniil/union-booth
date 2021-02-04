<script>
  export let details;

  const handleUnlockedChange = e => {
    console.log('Toggle: ', e.target.checked);
  }
</script>

<input
  type="checkbox"
  name="is-unlocked-{details.id}"
  id="is-unlocked-{details.id}"
  checked={details.isUnlocked}
  on:change={handleUnlockedChange}>
<label for="is-unlocked-{details.id}">Unlocked</label>