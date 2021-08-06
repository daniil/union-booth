<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let id;
  export let label;
  export let value;
  export let disabled;
  export let options;

  $: selectedOption = options.find(option => option.value === value);
  $: filteredOptions = options.filter(option => option.value !== value);

  let isOpen = false;

  const openDropdown = () => {
    isOpen = !isOpen;
  }
</script>

<style lang="scss">
  .dropdown-container {
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
  }
  .label {
    margin: 0.1rem 0.5rem 0 0;
    opacity: 0.7;
  }
  .options-container {
    position: relative;
  }
  .selected-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: rgba(219, 211, 216, 0.15);
    padding: 0 0.75rem;
    border-radius: 4px;
    border: 1px solid rgba(219, 211, 216, 0.3);
    color: rgb(5, 102, 141);
    &:hover,
    &.active {
      background-color: rgba(5, 102, 141, 0.05);
      border-color: rgba(5, 102, 141, 0.15);
      .option-value,
      .expand-icon {
        filter: brightness(1.25);
      }
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
    top: auto;
    left: 0;
    list-style: none;
    margin: 0;
    background-color: #FDFCFD;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
  .option {
    cursor: pointer;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
    &:hover {
      color: #05668d;
    }
  }
</style>

<div class="dropdown-container">
  <div class="label" id={`${id}-label`}>{label}</div>
  <div class="options-container">
    <div
      class="selected-option"
      class:active={isOpen}
      on:click={openDropdown}
      aria-haspopup="listbox"
      aria-labelledby={`${id}-label`}
    >
      <div class="option-value">{selectedOption.text}</div>
      <div class="expand-icon">&rsaquo;</div>
    </div>
    {#if isOpen}
      <ul
        class="options"
        role="listbox"
        tabindex="-1"
        transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}"
      >
        {#each filteredOptions as option (option.id)}
          <li class="option" role="option">
            {option.text}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>