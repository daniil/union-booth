<script>
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import { DEACTIVATE_COHORT_QUESTION } from 'graphql/queries/cohort-question';
  import Button from 'components/forms/Button.svelte';

  export let questionId;
  export let isOwner;

  const dispatch = createEventDispatcher();

  const deactivateCohortQuestion = mutation(DEACTIVATE_COHORT_QUESTION);
  
  const handleEdit = () => {
    dispatch('edit', { questionId });
    dispatch('action-complete');
  }

  const handleDeactivate = async () => {
    try {
      await deactivateCohortQuestion({
        variables: {
          cohortQuestionId: questionId
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
  {#if isOwner}
    <Button style="link" label="Edit" action={handleEdit}/>
  {/if}
  <Button style="link" variant="danger" label="Delete" action={handleDeactivate}/>
</nav>