<script>
  import { goto, stores } from "@sapper/app";
  import { post } from '../../utils/request';

  const { session } = stores();

  const handleSubmit = async e => {
    const discourse = await post('admin/add-new-discourse.json', {
      topic: e.target.topic.value
    });

    if (!discourse.error) {
      $session.topicListRefresh = Date.now();
      goto('/');
    } else {
      console.log('ERROR: ', discourse.error);
    }
  }
</script>

<form action="/add-new-discourse" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="topic">Topic: </label>
    <input type="text" name="topic" id="topic" placeholder="Topic" required>
  </div>
  <div class="form-example">
    <input type="submit" value="Add">
  </div>
</form>