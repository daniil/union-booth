<script>
  export let id;
  export let label;
  export let value;
  export let disabled;
  export let options;

  $: selectedOption = options.find(option => option.value === value);

  const openDropdown = () => {
    console.log('Open');
  }
</script>

<style lang="scss">
  .dropdown-container {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
  }
  .label {
    margin: 0.1rem 0.5rem 0 0;
    opacity: 0.7;
  }
  .selected-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: rgb(5, 102, 141);
    &:hover {
      filter: brightness(1.25);
    }
  }
  .option-value {
    font-size: 0.9rem;
    font-weight: 500;
  }
  .expand-icon {
    transform: translateX(-4px) rotate(90deg);
    margin-left: 0.75rem;
    opacity: 0.75;
    font-size: 1.5rem;
  }
  .options {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<div class="dropdown-container">
  <div class="label" id={`${id}-label`}>{label}</div>
  <div class="options-container">
    <div class="selected-option" on:click={openDropdown} aria-haspopup="listbox" aria-labelledby={`${id}-label`}>
      <div class="option-value">{selectedOption.text}</div>
      <div class="expand-icon">&rsaquo;</div>
    </div>
    <ul class="options" role="listbox" tabindex="-1">
      {#each options as option (option.id)}
        <li role="option">
          {option.text}
        </li>
      {/each}
    </ul>
  </div>
</div>