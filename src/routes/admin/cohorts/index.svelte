<svelte:head>
	<title>Union Booth :: Admin - Cohorts</title>
</svelte:head>

<script context="module">
  import { SELECTED_PROGRAM } from '../programs/_queries';

  export async function preload(_, session) {
    try {
      await session.apolloClient.query({ query: SELECTED_PROGRAM });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';
  import AddNewCohort from './_AddNewCohort.svelte';
  import Cohorts from './_Cohorts.svelte';

  let cohorts = [];

  const { session } = stores();

  const readQuery = () => {
    return $session.apolloClient.readQuery({ query: SELECTED_PROGRAM }).selectedProgram;
  }

  let selectedProgram = readQuery();
  
  onMount(() => {
    selectedProgram = readQuery();
  });

  const handleCohortAdded = async e => {
    console.log('Cohort Added!', e.detail.cohort);
  }
</script>

<style>
  section {
    margin-bottom: 2rem;
  }
</style>

<h2>Cohorts</h2>

{#if selectedProgram}
  <section>
    <h3>Create New Program Cohort</h3>
    <AddNewCohort
      selectedProgram={selectedProgram}
      on:cohort-added={handleCohortAdded}
    />
  </section>
  <section>
    <h3>Program Cohorts</h3>
    <Cohorts {cohorts}/>
  </section>
{:else}
  <p>No active program selected currently 🙍🏼‍♂️. Please <a href="/admin/programs">select one</a></p>
{/if}