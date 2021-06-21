<script>
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import { DEACTIVATE_COHORT_QUESTION } from 'graphql/queries/cohort-question';
  import Button from 'components/Button.svelte';

  export let questionId;

  const dispatch = createEventDispatcher();

  const deactivateCohortQuestion = mutation(DEACTIVATE_COHORT_QUESTION);
  
  const handleEdit = () => {
    console.log('Edit');
  }

  const handleDeactivate = async () => {
    try {
      await deactivateCohortQuestion({
        variables: {
          questionId
        }
      });
      dispatch('action-complete');
    } catch(err) {
      console.log('ERROR: ', err);
    }
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