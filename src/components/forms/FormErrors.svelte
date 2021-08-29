<script>
  export let errors;
</script>

<style lang="scss">
  .error-container {
    padding: 1rem;
    margin-top: 2rem;
    background-color: rgba(232, 180, 188, 0.25);
    border: 1px solid #E8B4BC;
    border-radius: 4px;
    font-size: 0.8rem;
    @media (min-width: 48rem) {
      font-size: 1rem;
    }
  }
</style>

{#if errors}
  <div class="error-container">{errors}</div>
{/if}