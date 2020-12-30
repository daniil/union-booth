<script context="module">
  import { get } from '../../utils/request';
  import TopicListItem from '../../components/TopicListItem.svelte';

  export async function preload(_page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    const res = await get('/discourse/list.json', this);

    if (!res.error) {
      return { topics: res.data }
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