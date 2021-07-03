<script>
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import { DEACTIVATE_COHORT_ANSWER } from 'graphql/queries/cohort-answer';
  import Button from 'components/forms/Button.svelte';

  export let answerId;
  export let isOwner;

  const dispatch = createEventDispatcher();

  const deactivateCohortAnswer = mutation(DEACTIVATE_COHORT_ANSWER);
  
  const handleEdit = () => {
    dispatch('action-complete');
  }

  const handleDeactivate = async () => {
    try {
      await deactivateCohortAnswer({
        variables: {
          cohortAnswerId: answerId
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