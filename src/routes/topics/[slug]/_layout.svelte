<script context="module">
  import { TOPIC } from 'graphql/queries/cohort-topic';

  export async function preload(page, session) {
    if (!session.user || !session.user.isVerified) {
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
  import TopicsNav from 'components/topics/TopicsNav.svelte';

  export let slug;
  export let segment;

  const { session } = stores();

  let cohortTopic = $session.apolloClient.readQuery({
    query: TOPIC,
    variables: { slug }
  }).topic;
</script>

<style lang="scss">
  .topic-container {
    padding: 0 1rem;
    @media (min-width: 48rem) {
      padding: 0;
    }
  }
  h1 {
    position: relative;
    font-size: 1.5rem;
    @media (min-width: 48rem) {
      font-size: 2rem;
    }
  }
  .back {
    position: static;
    display: block;
    padding: 1rem 0;
    margin-top: -1rem;
    line-height: 1;
    font-size: 0.9rem;
    font-weight: 400;
    text-decoration: none;
    color: #05668D;
    @media (min-width: 48rem) {
      position: absolute;
      right: 105%;
      top: -19%;
      padding: 0;
      margin: 0;
      line-height: inherit;
      font-size: 2.5rem;
      font-weight: 200;
    }
    &:hover {
      .chevron {
        filter: brightness(1.25);
        @media (min-width: 48rem) {
          transform: translateX(-3px) scale(1.1);
        }
      }
    }
    .label {
      @media (min-width: 48rem) {
        display: none;
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

<div class="topic-container">
  <div class="title-wrapper">
    <h1>
      <a class="back" href="/topics">
        <div class="chevron">&lsaquo; <span class="label">back</span></div>
      </a>
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
</div>
