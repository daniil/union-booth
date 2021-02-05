<svelte:head>
	<title>Union Booth :: Admin - Active Cohort</title>
</svelte:head>

<script context="module">
  import { SELECTED_PROGRAM } from 'graphql/queries/admin/programs';
  import { SELECTED_COHORT } from 'graphql/queries/admin/cohorts';
  import { COHORT_TOPICS } from 'graphql/queries/admin/active-cohort';

  export async function preload(_, session) {
    try {
      await session.apolloClient.query({ query: SELECTED_PROGRAM });
      const selectedCohortQuery = await session.apolloClient.query({ query: SELECTED_COHORT });
      await session.apolloClient.query({
        query: COHORT_TOPICS,
        variables: {
          cohortId: selectedCohortQuery.data.selectedCohort.id
        }
      })
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import CohortTopics from 'components/admin/active-cohort/CohortTopics.svelte';

  const { session } = stores();

  let selectedProgram = $session.apolloClient.readQuery({ query: SELECTED_PROGRAM }).selectedProgram;

  $session.apolloClient
    .watchQuery({ query: SELECTED_PROGRAM })
    .subscribe(({ data }) => {
      selectedProgram = data.selectedProgram;
    });

  let selectedCohort = $session.apolloClient.readQuery({ query: SELECTED_COHORT }).selectedCohort;

  $session.apolloClient
    .watchQuery({ query: SELECTED_COHORT })
    .subscribe(({ data }) => {
      selectedCohort = data.selectedCohort;
    });
  
  let cohortTopics = [];

  $: if (selectedCohort) {
    try {
      cohortTopics = $session.apolloClient.readQuery({
        query: COHORT_TOPICS,
        variables: {
          cohortId: selectedCohort.id
        }
      }).cohortTopics;
    } catch(e) {};

    $session.apolloClient
      .watchQuery({
        query: COHORT_TOPICS,
        variables: {
          cohortId: selectedCohort.id
        },
        fetchPolicy: 'cache-and-network'
      })
      .subscribe(({ data }) => {
        if (!data) return;
        cohortTopics = data.cohortTopics;
      });
  }
</script>

<style>
  section {
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 1rem;
    color: rgba(85, 67, 72, 0.7);
  }
  .selected {
    color: rgba(85, 67, 72, 0.9);
  }
</style>

<h2>Active Cohort</h2>

{#if selectedProgram}
  {#if selectedCohort}
    <section>
      <h3>
        <span class="selected">{selectedProgram.title}:</span> <span class="selected">{selectedCohort.title}</span> Topics
      </h3>
      <CohortTopics
        {selectedCohort}
        {cohortTopics}
      />
    </section>
  {:else}
    <p>No active cohort selected currently 🙍🏼‍♂️. Please <a href="/admin/cohorts">select one</a></p>
  {/if}
{:else}
  <p>No active program selected currently 🙍🏼‍♂️. Please <a href="/admin/programs">select one</a></p>
{/if}
