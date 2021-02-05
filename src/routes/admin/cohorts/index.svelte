<svelte:head>
	<title>Union Booth :: Admin - Cohorts</title>
</svelte:head>

<script context="module">
  import { SELECTED_PROGRAM } from 'graphql/queries/admin/programs';
  import { COHORTS, SELECTED_COHORT } from 'graphql/queries/admin/cohorts';

  export async function preload(_, session) {
    try {
      const selectedProgramQuery = await session.apolloClient.query({ query: SELECTED_PROGRAM });
      await session.apolloClient.query({
        query: COHORTS,
        variables: {
          programId: selectedProgramQuery.data.selectedProgram.id
        }
      });
      await session.apolloClient.query({ query: SELECTED_COHORT });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import AddNewCohort from 'components/admin/cohorts/AddNewCohort.svelte';
  import Cohorts from 'components/admin/cohorts/Cohorts.svelte';

  const { session } = stores();

  let selectedProgram = $session.apolloClient.readQuery({ query: SELECTED_PROGRAM }).selectedProgram;

  $session.apolloClient
    .watchQuery({ query: SELECTED_PROGRAM })
    .subscribe(({ data }) => {
      selectedProgram = data.selectedProgram;
    });
  
  let cohorts = [];
  let selectedCohort;

  $: if (selectedProgram) {
    try {
      cohorts = $session.apolloClient.readQuery({
        query: COHORTS,
        variables: {
          programId: selectedProgram.id
        }
      }).cohorts;
    } catch(e) {}

    $session.apolloClient
      .watchQuery({
        query: COHORTS,
        variables: {
          programId: selectedProgram.id
        }
      })
      .subscribe(({ data }) => {
        cohorts = data.cohorts;
      });

    selectedCohort = $session.apolloClient.readQuery({ query: SELECTED_COHORT }).selectedCohort;

    $session.apolloClient
      .watchQuery({ query: SELECTED_COHORT })
      .subscribe(({ data }) => {
        selectedCohort = data.selectedCohort;
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
  .selected-program {
    color: rgba(85, 67, 72, 0.9);
  }
</style>

<h2>Cohorts</h2>

{#if selectedProgram}
  <section>
    <h3>Create New <span class="selected-program">{selectedProgram.title}</span> Cohort</h3>
    <AddNewCohort {selectedProgram}/>
  </section>
  <section>
    <h3><span class="selected-program">{selectedProgram.title}</span> Cohorts</h3>
    <Cohorts
      {selectedCohort}
      {cohorts}
    />
  </section>
{:else}
  <p>No active program selected currently 🙍🏼‍♂️. Please <a href="/admin/programs">select one</a></p>
{/if}