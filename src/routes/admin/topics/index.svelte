<svelte:head>
	<title>Union Booth :: Admin - Topics</title>
</svelte:head>

<script context="module">
  import AddNewTopic from './_AddNewTopic.svelte';
  import Topics from './_Topics.svelte';

  export async function preload(_page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }
  }
</script>

<style>
  section {
    margin-bottom: 2rem;
  }
</style>

<h2>Topics</h2>

<section>
  <h3>Add New Topic</h3>
  <AddNewTopic/>
</section>

<section>
  <h3>Manage Existing Topics</h3>
  <Topics/>
</section>

