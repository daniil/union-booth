<script>
  import { debounce } from 'debounce';
  import { mutation } from 'svelte-apollo';
  import { VALIDATE_USERNAME_AND_EMAIL } from 'graphql/queries/user';
  import TextInput from 'components/forms/TextInput.svelte';

  export let formDisabled;

  let inputInvalid = false;

  const validateUsernameAndEmail = mutation(VALIDATE_USERNAME_AND_EMAIL);

  const handleValidation = async username => {
    const validate = await validateUsernameAndEmail({
      variables: {
        login: username
      }
    });

    const isUniqueValue = validate.data.validateUsernameAndEmail;

    inputInvalid = !isUniqueValue;
  }

  const handleBlur = e => {
    handleValidation(e.target.value);
  }

  const handleKeyDown = () => {
    inputInvalid = false;
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
  invalid={inputInvalid}
  on:blur={handleBlur}
  on:keydown={handleKeyDown}
  on:keypress={handleKeyPress}
/>