<svelte:head>
	<title>Union Booth :: Admin - Cohorts</title>
</svelte:head>

<script context="module">
  import { PROGRAMS } from '../programs/_queries';

  export async function preload(_, session) {
    try {
      await session.apolloClient.query({ query: PROGRAMS });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import AddNewCohort from './_AddNewCohort.svelte';
  import Cohorts from './_Cohorts.svelte';

  const { session } = stores();

  const readQuery = () => {
    return $session.apolloClient.readQuery({ query: PROGRAMS }).programs;
  }

  let programs = readQuery();

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

{#if programs.length}
  <section>
    <h3>Create New Program Cohort</h3>
    <AddNewCohort
      {programs}
      on:cohort-added={handleCohortAdded}
    />
  </section>

  <section>
    <h3>Program Cohorts</h3>
    <Cohorts/>
  </section>
{:else}
  <p>No programs currently 🙍🏼‍♂️. Please <a href="/admin/programs">create one</a></p>
{/if}