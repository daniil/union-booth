<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_TOPIC } from './_queries';

  const { session } = stores();
  const addTopic = mutation(ADD_TOPIC);

  let topicEl;

  const handleSubmit = async e => {
    try {
      await addTopic({
        variables: {
          title: e.target.topic.value
        }
      });
      $session.topicListRefresh = Date.now();
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