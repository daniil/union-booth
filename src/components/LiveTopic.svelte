<svelte:head>
	<title>Union Booth :: Live: {topic ? topic.title : 'Loading'}</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { get } from '../utils/request';
  import Loading from './Loading.svelte';
  import TopicQuestions from './TopicQuestions.svelte';
  import { mutation, subscribe, getClient } from "svelte-apollo";
  import gql from 'graphql-tag';

  let topic;
  let loading = true;

  const testSub = subscribe(gql`
    subscription NewTopic($id: ID) {
      testSub(id: $id) {
        title
      }
    }
  `, {
    variables: {
      id: 123
    }
  });

  const addTopic = mutation(gql`
    mutation AddTopic($title: String!) {
      addTopic(title: $title) {
        title
      }
    }
  `);

  const client = getClient();

  onMount(async () => {
    client.query({ query: gql`
      query Me {
        me {
          email
          firstName
          lastName
        }
      }
    `})

    setInterval(() => {
      addTopic({ variables: { title: (new Date()).toTimeString() }})
    }, 1000);

    const res = await get('topics/live.json');
    loading = false;

    if (!res.error) {
      topic = res.data;
    }
  });
</script>

{#await $testSub}
  Waiting for new topic...
{:then result}
  Test WS Sub: {result.data && result.data.testSub.title}
{/await}

{#if loading}
  <Loading/>
{:else}
  {#if topic}
    <h1>{topic.title}</h1>
    <TopicQuestions id={topic.id}/>
  {:else}
    <p>No Live Topic currently 🤷🏽‍♀️</p>
  {/if}
{/if}


