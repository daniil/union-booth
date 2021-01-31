<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_TOPIC, TOPICS } from 'graphql/queries/admin/topics';

  export let selectedProgram;

  const { session } = stores();

  const addTopic = mutation(ADD_TOPIC);

  let topicEl;

  const handleSubmit = async e => {
    try {
      await addTopic({
        variables: {
          programId: selectedProgram.id,
          title: e.target.topic.value
        },
        update: (_, mutationResult) => {
          const topics = $session.apolloClient.readQuery({
            query: TOPICS,
            variables: {
              programId: selectedProgram.id
            }
          }).topics;

          $session.apolloClient.writeQuery({
            query: TOPICS,
            variables: {
              programId: selectedProgram.id
            },
            data: {
              topics: [...topics, mutationResult.data.addTopic]
            }
          });
        }
      });

      topicEl.value = '';
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<form action="/add-topic" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="topic">Topic: </label>
    <input bind:this={topicEl} type="text" name="topic" id="topic" placeholder="Topic" required>
    <input type="submit" value="Add">
  </div>
</form>