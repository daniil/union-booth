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
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
  }
  label {
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
</style>

<div class="dropdown-container">
  <label for={id}>{label}</label>
  <select
    id={id}
    name={id}
    {disabled}
    bind:value={value}>
    {#each options as option (option.id)}
      <option value={option.value}>
        {option.text}
      </option>
    {/each}
  </select>
  <div class="options-container">
    <div class="selected-option" on:click={openDropdown}>
      <div class="option-value">{selectedOption.text}</div>
      <div class="expand-icon">&rsaquo;</div>
    </div>
  </div>
</div>