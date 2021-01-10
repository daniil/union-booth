<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_TOPIC } from './_queries';

  const { session } = stores();
  const addTopic = mutation(ADD_TOPIC);

  const handleSubmit = async e => {
    try {
      await addTopic({
        variables: {
          title: e.target.topic.value
        }
      });
      // TODO: This is original functionality, eventually we want to probably just refresh the list of all topics instead of redirecting. topicListRefresh might also not be necessary, but it could be a Sapper thing
      $session.topicListRefresh = Date.now();
      goto('/');
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<form action="/add-topic" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="topic">Topic: </label>
    <input type="text" name="topic" id="topic" placeholder="Topic" required>
  </div>
  <div class="form-example">
    <input type="submit" value="Add">
  </div>
</form>