<script>
  import Button from 'components/Button.svelte';
  
  const handleEdit = () => {
    console.log('Edit');
  }

  const handleDeactivate = () => {
    console.log('Deactivate');
  }
</script>

<style lang="scss">
  .question-actions-nav {
    display: flex;
    padding: 0.75rem;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    border-radius: 4px;
  }
</style>

<nav class="question-actions-nav">
  <Button style="link" label="Edit" action={handleEdit}/>
  <Button style="link" variant="danger" label="Delete" action={handleDeactivate}/>
</nav>