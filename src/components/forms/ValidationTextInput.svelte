<script>
  import { debounce } from 'debounce';
  import { createEventDispatcher } from 'svelte';
  import TextInput from 'components/forms/TextInput.svelte';

  export let id;
  export let label;
  export let formDisabled;
  export let inputInvalid;

  const dispatch = createEventDispatcher();

  const handleBlur = e => {
    dispatch('validate', { 
      value: e.target.value
    });
  }

  const handleKeyDown = () => {
    inputInvalid = false;
  }

  const handleKeyPress = debounce(e => {
    dispatch('validate', { 
      value: e.target.value
    });
  }, 500);
</script>

<TextInput
  {id}
  type="text"
  {label}
  required
  disabled={formDisabled}
  invalid={inputInvalid}
  on:blur={handleBlur}
  on:keydown={handleKeyDown}
  on:keypress={handleKeyPress}
/>
