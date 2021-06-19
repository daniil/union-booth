<script>
  import MeatballIcon from 'components/MeatballIcon.svelte';

  const handleActionDropdown = () => {
    console.log('Trigger action dropdown');
  }
</script>

<style lang="scss">
  .question-actions:not(:empty) {
    display: flex;
    background-color: white;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  }
  .trigger-action {
    display: inline-block;
    border: none;
    padding: 0.75rem 1rem;
    margin: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    &:hover {
      filter: brightness(1.25);
    }
  }
</style>

<div class="question-actions">
  <button class="trigger-action" on:click={handleActionDropdown}>
    <MeatballIcon color="#05668D" label="Actions"/>
  </button>
</div>