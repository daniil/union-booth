<script>
  import TextInput from 'components/forms/TextInput.svelte';

  export let formDisabled;

  const handleBlur = e => {
    console.log(e.target.value)
  }
</script>

<TextInput
  id="username"
  type="text"
  label="Username"
  required
  disabled={formDisabled}
  on:blur={handleBlur}
/>