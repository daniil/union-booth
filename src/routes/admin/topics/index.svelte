<svelte:head>
	<title>Union Booth :: Admin - Topics</title>
</svelte:head>

<script context="module">
  import { SELECTED_PROGRAM } from 'graphql/queries/admin/programs';
  import { TOPICS } from 'graphql/queries/admin/topics';

  export async function preload(_, session) {
    try {
      const selectedProgramQuery = await session.apolloClient.query({ query: SELECTED_PROGRAM });
      await session.apolloClient.query({
        query: TOPICS,
        variables: {
          programId: selectedProgramQuery.data.selectedProgram.id
        }
      });
    } catch(err) {};
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import AddNewTopic from 'components/admin/topics/AddNewTopic.svelte';
  import Topics from 'components/admin/topics/Topics.svelte';

  const { session } = stores();

  let selectedProgram = $session.apolloClient.readQuery({ query: SELECTED_PROGRAM }).selectedProgram;

  $session.apolloClient
    .watchQuery({ query: SELECTED_PROGRAM })
    .subscribe(({ data }) => {
      selectedProgram = data.selectedProgram;
    });
  
  let topics = [];

  $: if (selectedProgram) {
    try {
      topics = $session.apolloClient.readQuery({
        query: TOPICS,
        variables: {
          programId: selectedProgram.id
        }
      }).topics;
    } catch(e) {}

    $session.apolloClient
      .watchQuery({
        query: TOPICS,
        variables: {
          programId: selectedProgram.id
        }
      })
      .subscribe(({ data }) => {
        topics = data.topics;
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

<h2>Topics</h2>

{#if selectedProgram}
  <section>
    <h3>Add New <span class="selected-program">{selectedProgram.title}</span> Topic</h3>
    <AddNewTopic {selectedProgram}/>
  </section>
  <section>
    <h3><span class="selected-program">{selectedProgram.title}</span> Topics</h3>
    <Topics {topics}/>
  </section>
{:else}
  <p>No active program selected currently 🙍🏼‍♂️. Please <a href="/admin/programs">select one</a></p>
{/if}

