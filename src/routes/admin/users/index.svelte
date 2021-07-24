<svelte:head>
	<title>Union Booth :: Admin - User Management</title>
</svelte:head>

<script context="module">
  import { SELECTED_PROGRAM } from 'graphql/queries/admin/programs';
  import { SELECTED_COHORT } from 'graphql/queries/admin/cohorts';

  export async function preload(_, session) {
    try {
      await session.apolloClient.query({ query: SELECTED_PROGRAM });
      await session.apolloClient.query({ query: SELECTED_COHORT });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import AuthContent from 'components/auth/AuthContent.svelte';
  import CohortTeamUsers from 'components/admin/users/CohortTeamUsers.svelte';
  import CohortUsers from 'components/admin/users/CohortUsers.svelte';

  const { session } = stores();

  let selectedProgram = $session.apolloClient.readQuery({ query: SELECTED_PROGRAM }).selectedProgram;

  const selectedProgramSub = $session.apolloClient
    .watchQuery({
      query: SELECTED_PROGRAM,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      selectedProgram = data.selectedProgram;
    });
  
  onDestroy(() => selectedProgramSub.unsubscribe());

  let selectedCohort = $session.apolloClient.readQuery({ query: SELECTED_COHORT }).selectedCohort;

  const selectedCohortSub = $session.apolloClient
    .watchQuery({
      query: SELECTED_COHORT,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      selectedCohort = data.selectedCohort;
    });

  onDestroy(() => selectedCohortSub.unsubscribe());
</script>

<style>
  section {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 1.5rem;
  }
  h3 {
    margin-bottom: 1rem;
    color: rgba(85, 67, 72, 0.7);
  }
  .selected {
    color: rgba(85, 67, 72, 0.9);
  }
</style>

<h2>User Management</h2>

{#if selectedProgram}
  <AuthContent role="admin">
    <section>
      <h3>
        <span class="selected">{selectedProgram.title}</span> Team
      </h3>
    </section>
  </AuthContent>
  {#if selectedCohort}
    <AuthContent role="manager">
      <section>
        <h3>
          <span class="selected">{selectedCohort.title}</span> Team
        </h3>
        <CohortTeamUsers cohortId={selectedCohort.id}/>
      </section>
      <section>
        <h3>
          <span class="selected">{selectedCohort.title}</span> Users
        </h3>
        <CohortUsers cohortId={selectedCohort.id}/>
      </section>
    </AuthContent>
  {:else}
    <h3>Cohort Users</h3>
    <p>No active cohort selected currently 🙍🏼‍♂️. Please <a rel="prefetch" href="/admin/cohorts">select one</a></p>
  {/if}
{:else}
  <p>No active program selected currently 🙍🏼‍♂️. Please <a rel="prefetch" href="/admin/programs">select one</a></p>
{/if}