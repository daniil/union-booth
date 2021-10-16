<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { TOGGLE_COHORT_TOPIC_UNLOCKED } from 'graphql/queries/admin/cohort-topic';
  import { COHORT_TOPICS } from 'graphql/queries/admin/cohort-topic';
  import Checkbox from 'components/forms/Checkbox.svelte';

  export let selectedCohort;
  export let details;

  const { session } = stores();

  const toggleCohortTopicUnlocked = mutation(TOGGLE_COHORT_TOPIC_UNLOCKED);

  const handleUnlockedChange = e => {
    toggleCohortTopicUnlocked({
      variables: {
        cohortId: selectedCohort.id,
        topicId: details.topic.id,
        status: e.target.checked
      },
      update: (_, mutationResult) => {
        const toggledCohortTopic = mutationResult.data.toggleCohortTopicUnlocked;

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

<Checkbox
  id="is-unlocked-{details.topic.id}"
  label="Unlocked"
  color="#05668D"
  checked={details.isUnlocked}
  on:change={handleUnlockedChange}
/>