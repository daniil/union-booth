<svelte:head>
	<title>Union Booth :: Admin - Programs</title>
</svelte:head>

<script context="module">
  import { PROGRAMS, SELECTED_PROGRAM } from './_queries';

  export async function preload(_, session) {
    try {
      await session.apolloClient.query({ query: PROGRAMS });
      await session.apolloClient.query({ query: SELECTED_PROGRAM });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import AddNewProgram from './_AddNewProgram.svelte';
  import Programs from './_Programs.svelte';

  const { session } = stores();

  let selectedProgram = $session.apolloClient.readQuery({ query: SELECTED_PROGRAM }).selectedProgram;

  $session.apolloClient
    .watchQuery({ query: SELECTED_PROGRAM })
    .subscribe(({ data }) => {
      selectedProgram = data.selectedProgram;
    });

  let programs = $session.apolloClient.readQuery({ query: PROGRAMS }).programs;

  $session.apolloClient
    .watchQuery({ query: PROGRAMS })
    .subscribe(({ data }) => {
      programs = data.programs;
    });
</script>

<style>
  section {
    margin-bottom: 2rem;
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