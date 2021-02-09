<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { TOGGLE_COHORT_TOPIC_STATUS } from 'graphql/queries/admin/active-cohort';
  import { COHORT_TOPICS } from 'graphql/queries/admin/active-cohort';

  export let selectedCohort;
  export let details;

  const { session } = stores();

  const toggleCohortTopicStatus = mutation(TOGGLE_COHORT_TOPIC_STATUS);

  const handleUnlockedChange = e => {
    toggleCohortTopicStatus({
      variables: {
        cohortId: selectedCohort.id,
        topicId: details.topic.id,
        statusType: 'isUnlocked',
        status: e.target.checked
      },
      update: (_, mutationResult) => {
        const toggledCohortTopic = mutationResult.data.toggleCohortTopicStatus;

        const cohortTopics = $session.apolloClient.readQuery({
          query: COHORT_TOPICS,
          variables: {
            cohortId: selectedCohort.id
          }
        }).cohortTopics;

        $session.apolloClient.writeQuery({
            query: COHORT_TOPICS,
            variables: {
              cohortId: selectedCohort.id
            },
            data: {
              cohortTopics: cohortTopics.map(cohortTopic => {
                if (cohortTopic.topic.id === toggledCohortTopic.topic.id) return toggledCohortTopic;
                return cohortTopic;
              })
            }
          });
      }
    })
  }
</script>

<style>
  .form-element {
    margin-left: 1rem;
  }
</style>

<div class="form-element">
  <input
    type="checkbox"
    name="is-unlocked-{details.topic.id}"
    id="is-unlocked-{details.topic.id}"
    checked={details.isUnlocked}
    on:change={handleUnlockedChange}>
  <label for="is-unlocked-{details.topic.id}">Unlocked</label>
</div>
