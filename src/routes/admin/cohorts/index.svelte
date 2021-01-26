<svelte:head>
	<title>Union Booth :: Admin - Cohorts</title>
</svelte:head>

<script context="module">
  import { SELECTED_PROGRAM } from '../programs/_queries';
  import { COHORTS } from './_queries';

  export async function preload(_, session) {
    try {
      const selectedProgramQuery = await session.apolloClient.query({ query: SELECTED_PROGRAM });
      await session.apolloClient.query({
        query: COHORTS,
        variables: {
          programId: selectedProgramQuery.data.selectedProgram.id
        }
      });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import AddNewCohort from './_AddNewCohort.svelte';
  import Cohorts from './_Cohorts.svelte';

  const { session } = stores();

  let selectedProgram = $session.apolloClient.readQuery({ query: SELECTED_PROGRAM }).selectedProgram;

  $session.apolloClient
    .watchQuery({ query: SELECTED_PROGRAM })
    .subscribe(({ data }) => {
      selectedProgram = data.selectedProgram;
    });
  
  let cohorts = [];

  if (selectedProgram) {
    cohorts = $session.apolloClient.readQuery({
      query: COHORTS,
      variables: {
        programId: selectedProgram.id
      }
    }).cohorts;

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
  }
  
</script>

<style>
  section {
    margin-bottom: 2rem;
  }
  .selected-program {
    color: rgba(85, 67, 72, 0.75);
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
    <Cohorts {cohorts}/>
  </section>
{:else}
  <p>No active program selected currently 🙍🏼‍♂️. Please <a href="/admin/programs">select one</a></p>
{/if}