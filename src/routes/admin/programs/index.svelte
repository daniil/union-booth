<svelte:head>
	<title>Union Booth :: Admin - Programs</title>
</svelte:head>

<script context="module">
  import { PROGRAMS, SELECTED_PROGRAM } from 'graphql/queries/admin/programs';

  export async function preload(_, session) {
    try {
      await session.apolloClient.query({ query: PROGRAMS });
      await session.apolloClient.query({ query: SELECTED_PROGRAM });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import AddNewProgram from 'components/admin/programs/AddNewProgram.svelte';
  import Programs from 'components/admin/programs/Programs.svelte';

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

  let programs = $session.apolloClient.readQuery({ query: PROGRAMS }).programs;

  const programsSub = $session.apolloClient
    .watchQuery({
      query: PROGRAMS,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      programs = data.programs;
    });

  onDestroy(() => programsSub.unsubscribe());
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
</style>

<h2>Programs</h2>

<section>
  <h3>Create New Program</h3>
  <AddNewProgram/>
</section>

<section>
  <h3>Your Programs</h3>
  <Programs
    {selectedProgram}
    {programs}
  />
</section>