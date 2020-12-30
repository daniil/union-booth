<script context="module">
  import AddNewTopic from './AddNewTopic.svelte';
  import Topics from './Topics.svelte';

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

<h1>Admin Section</h1>

<section>
  <h2>Add New Topic</h2>
  <AddNewTopic/>
</section>

<section>
  <h2>Manage Existing Topics</h2>
  <Topics/>
</section>
