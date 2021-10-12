<script>
  import { debounce } from 'debounce';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import TextInput from 'components/forms/TextInput.svelte';

  export let id;
  export let label;
  export let value;
  export let disabled;
  export let inputInvalid;
  export let validationMessage;

  const dispatch = createEventDispatcher();

  const handleBlur = e => {
    dispatch('validate', { 
      value: e.target.value
    });
  }

  const handleKeyPress = debounce(e => {
    dispatch('validate', { 
      value: e.target.value
    });
  }, 500);
</script>

<style>
  .input-container {
    position: relative;
  }
  .invalid-message {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    border-radius: 4px;
    padding: 0.5rem;
    border: 1px solid rgba(239, 108, 139, 0.3);
    white-space: nowrap;
    font-size: 0.8rem;
    color: #E72350;
  }
</style>

<div class="input-container">
  <TextInput
    {id}
    type="text"
    {label}
    {value}
    required
    {disabled}
    invalid={inputInvalid}
    on:blur={handleBlur}
    on:keydown
    on:keypress={handleKeyPress}
  />
  {#if inputInvalid}
    <div class="invalid-message" transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
      {validationMessage}
    </div>
  {/if}
</div>
