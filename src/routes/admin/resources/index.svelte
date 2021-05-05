<svelte:head>
	<title>Union Booth :: Admin - Resources</title>
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
  import { onDestroy } from 'svelte';
  import Topics from 'components/admin/resources/Topics.svelte';

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
  
  let topics = [];

  $: if (selectedProgram) {
    fetchTopics();
  }

  const fetchTopics = () => {
    try {
      topics = $session.apolloClient.readQuery({
        query: TOPICS,
        variables: {
          programId: selectedProgram.id
        }
      }).topics;
    } catch(e) {}

    const topicsSub = $session.apolloClient
      .watchQuery({
        query: TOPICS,
        variables: {
          programId: selectedProgram.id
        },
        fetchPolicy: 'cache-and-network'
      })
      .subscribe(({ data }) => {
        topics = data.topics;
      });

    onDestroy(() => topicsSub.unsubscribe());
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

<h2>Resources</h2>

{#if selectedProgram}
  <section>
    <h3><span class="selected-program">{selectedProgram.title}</span> Topics</h3>
    <Topics {topics}/>
  </section>
{:else}
  <p>No active program selected currently 🙍🏼‍♂️. Please <a rel="prefetch" href="/admin/programs">select one</a></p>
{/if}