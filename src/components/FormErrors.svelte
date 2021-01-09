<script>
  export let errors;
</script>

<style>
  .error-container {
    padding: 1rem;
    margin-top: 2rem;
    background-color: rgba(232, 180, 188, 0.25);
    border: 1px solid #E8B4BC;
    border-radius: 4px;
  }
</style>

{#if errors}
  <div class="error-container">{errors}</div>
{/if}