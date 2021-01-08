<script>
  import { goto, stores } from '@sapper/app';
  import { post } from '../../utils/request';

  const { session } = stores();

  const handleSubmit = async e => {
    const res = await post('admin/add-new-topic.json', {
      topic: e.target.topic.value
    });

    if (!res.error) {
      $session.topicListRefresh = Date.now();
      goto('/');
    } else {
      console.log('ERROR: ', res.error);
    }
  }
</script>

<form action="/add-new-topic" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="topic">Topic: </label>
    <input type="text" name="topic" id="topic" placeholder="Topic" required>
  </div>
  <div class="form-example">
    <input type="submit" value="Add">
  </div>
</form>