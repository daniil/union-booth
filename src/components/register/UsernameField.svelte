<script>
  import { debounce } from 'debounce';
  import { mutation } from 'svelte-apollo';
  import { VALIDATE_USERNAME_AND_EMAIL } from 'graphql/queries/user';
  import TextInput from 'components/forms/TextInput.svelte';

  export let formDisabled;

  const validateUsernameAndEmail = mutation('VALIDATE_USERNAME_AND_EMAIL');

  const handleValidation = username => {
    console.log(username);
  }

  const handleBlur = e => {
    handleValidation(e.target.value);
  }

  const handleKeyPress = debounce(e => {
    handleValidation(e.target.value);
  }, 350);
</script>

<TextInput
  id="username"
  type="text"
  label="Username"
  required
  disabled={formDisabled}
  on:blur={handleBlur}
  on:keypress={handleKeyPress}
/>