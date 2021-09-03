<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { TOGGLE_COHORT_SELECT, SELECTED_COHORT } from 'graphql/queries/admin/cohorts';
  import Checkbox from 'components/forms/Checkbox.svelte';

  export let selectedCohort;
  export let details;

  const { session } = stores();

  $: isSelected = selectedCohort && details.id === selectedCohort.id;
  $: isCohortOwner = $session.user && $session.user.id === details.user.id;

  const toggleCohortSelect = mutation(TOGGLE_COHORT_SELECT);

  const handleActiveChange = async e => {
    await toggleCohortSelect({
      variables: {
        id: details.id,
        isSelected: e.target.checked
      },
      update: (_, mutationResult) => {
        const toggledCohort = mutationResult.data.toggleCohortSelect;

        $session.apolloClient.writeQuery({
          query: SELECTED_COHORT,
          data: {
            selectedCohort: toggledCohort
          }
        });
      }
    });
  }
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    @media (min-width: 48rem) {
      font-size: 1rem;
    }
    &.is-active {
      background-color: rgba(212, 224, 155, 0.5);
      border: 1px solid rgb(212, 224, 155);
      border-radius: 4px;
    }
    &.is-owner {
      h4 {
        font-weight: 500;
      }
    }
    &:not(.is-owner) {
      h4,
      .cohort-id {
        opacity: 0.75;
      }
    }
  }
  h4 {
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }
  .cohort-id {
    font-size: 0.7rem;
    font-weight: bold;
    color: rgba(85, 67, 72, 0.7);
  }
  .active-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<form action="update-cohort" method="post">
  <div
    class="wrapper"
    class:is-active={isSelected}
    class:is-owner={isCohortOwner}
  >
    <h4>{details.title}</h4>
    <div class="active-container">
      <span class="cohort-id">{details.id}</span>
      <Checkbox
        id="is-active-{details.id}"
        label="Active"
        color="#05668D"
        checked={isSelected}
        on:change={handleActiveChange}
      />
    </div>
  </div>
</form>