<script>
  export let id;
  export let label;
  export let value;
  export let disabled;
  export let options;
</script>

<style lang="scss">
  .dropdown-container {
    display: flex;
    align-items: center;
  }
  label {
    margin-right: 0.5rem;
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
</div>