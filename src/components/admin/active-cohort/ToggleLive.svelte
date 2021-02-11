<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { TOGGLE_COHORT_TOPIC_LIVE } from 'graphql/queries/admin/active-cohort';
  import { COHORT_TOPICS } from 'graphql/queries/admin/active-cohort'; 

  export let selectedCohort;
  export let details;

  const { session } = stores();

  const toggleCohortTopicLive = mutation(TOGGLE_COHORT_TOPIC_LIVE);

  const handleLiveChange = e => {
    toggleCohortTopicLive({
      variables: {
        cohortId: selectedCohort.id,
        topicId: details.topic.id,
        status: e.target.checked
      },
      update: (_, mutationResult) => {
        const toggledCohortTopic = mutationResult.data.toggleCohortTopicLive;

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
                return { ...cohortTopic, isLive: false };
              })
            }
          });
      }
    });
  }
</script>

<style>
  .form-element {
    margin-left: 1rem;
  }
  input:disabled + label {
    opacity: 0.5;
  }
</style>

<div class="form-element">
  <input
    type="checkbox"
    name="is-live-{details.topic.id}"
    id="is-live-{details.topic.id}"
    checked={details.isLive}
    disabled={!details.isUnlocked}
    on:change={handleLiveChange}>
  <label for="is-live-{details.topic.id}">Live</label>
</div>
