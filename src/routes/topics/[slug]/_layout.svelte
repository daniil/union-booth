<script context="module">
  import { TOPIC } from 'graphql/queries/cohort-topic';

  export async function preload(page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    await session.apolloClient.query({
      query: TOPIC,
      variables: { slug: page.params.slug }
    });

    return {
      slug: page.params.slug
    };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import TopicsNav from 'components/TopicsNav.svelte';

  export let slug;
  export let segment;

  const { session } = stores();

  let cohortTopic = $session.apolloClient.readQuery({
    query: TOPIC,
    variables: { slug }
  }).topic;
</script>

<style lang="scss">
  h1 {
    position: relative;
  }
  .back {
    position: absolute;
    right: 110%;
    text-decoration: none;
    color: #05668D;
    top: -19%;
    font-size: 2.5rem;
    font-weight: 200;
    &:hover {
      .chevron {
        filter: brightness(1.25);
        transform: translateX(-3px) scale(1.1);
      }
    }
  }
  .chevron {
    transition: transform 0.15s ease-in;
  }
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .live {
    background-color: rgb(212, 224, 155);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    color: white;
    text-shadow: 0px 1px 0 rgb(0 0 0 / 30%);
    font-size: 1.25rem;
  }
</style>

<div class="title-wrapper">
  <h1>
    <a class="back" href="/topics"><div class="chevron">&lsaquo;</div></a>
    {cohortTopic.topic.title}
  </h1>
  {#if cohortTopic.isLive}
    <div class="live">LIVE</div>
  {/if}
</div>

<TopicsNav
  {slug}
  {segment}
/>

<slot></slot>