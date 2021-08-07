<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { TOGGLE_COHORT_SELECT, SELECTED_COHORT } from 'graphql/queries/admin/cohorts';

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
    align-items: center;
    padding: 0.25rem 0.5rem;
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
      .details {
        opacity: 0.75;
      }
    }
  }
  .details {
    display: flex;
    align-items: flex-end;
  }
  h4 {
    margin-bottom: 0;
  }
  .cohort-id {
    margin-left: 0.7rem;
    font-size: 0.7rem;
    font-weight: bold;
    color: rgba(85, 67, 72, 0.7);
  }
</style>

<form action="update-cohort" method="post">
  <div
    class="wrapper"
    class:is-active={isSelected}
    class:is-owner={isCohortOwner}
  >
    <div class="details">
      <h4>{details.title}</h4>
      <span class="cohort-id">{details.id}</span>
    </div>
    <div class="form-element">
      <input
        type="checkbox"
        name="is-active-{details.id}"
        id="is-active-{details.id}"
        checked={isSelected}
        on:change={handleActiveChange}>
      <label for="is-active-{details.id}">Active</label>
    </div>
  </div>
</form>