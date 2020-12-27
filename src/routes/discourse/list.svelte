<script context="module">
  import TopicListItem from '../../components/TopicListItem.svelte';

  export async function preload(_page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    const res = await this.fetch('/discourse/list.json');
    const topics = await res.json();

    if (!res.error) {
      return { topics: topics.data }
    }
  }
</script>

<script>
  export let topics;
</script>

<h1>All Topics</h1>

{#each topics as topic (topic.id)}
  <TopicListItem details={topic}/>
{/each}