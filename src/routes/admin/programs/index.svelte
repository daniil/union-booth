<svelte:head>
	<title>Union Booth :: Admin - Programs</title>
</svelte:head>

<script context="module">
  import { PROGRAMS } from './_queries';

  export async function preload(_, session) {
    try {
      await session.apolloClient.query({ query: PROGRAMS });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import AddNewProgram from './_AddNewProgram.svelte';
  import Programs from './_Programs.svelte';

  const { session } = stores();

  const readQuery = () => {
    return $session.apolloClient.readQuery({ query: PROGRAMS }).programs;
  }

  let programs = readQuery();

  const handleProgramAdded = async e => {
    await $session.apolloClient.writeQuery({
      query: PROGRAMS,
      data: {
        programs: [
          ...programs,
          e.detail.program
        ]
      }
    });
    programs = readQuery();
  }
</script>

<style>
  section {
    margin-bottom: 2rem;
  }
</style>

<h2>Programs</h2>

<section>
  <h3>Create New Program</h3>
  <AddNewProgram
    on:program-added={handleProgramAdded}
  />
</section>

<section>
  <h3>Your Programs</h3>
  <Programs {programs}/>
</section>