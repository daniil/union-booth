<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_TOPIC, TOPICS } from 'graphql/queries/admin/topics';
  import TextInput from 'components/forms/TextInput.svelte';
  import Button from 'components/forms/Button.svelte';

  export let selectedProgram;

  const { session } = stores();

  const addTopic = mutation(ADD_TOPIC);

  let topicTitle;
  let formDisabled = false;
  
  $: buttonVariant = formDisabled ? 'loading' : '';

  const handleSubmit = async e => {
    formDisabled = true;

    try {
      await addTopic({
        variables: {
          programId: selectedProgram.id,
          title: topicTitle
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

      topicTitle = '';
      formDisabled = false;
    } catch(err) {
      formDisabled = false;
      console.log('ERROR: ', err);
    }
  }
</script>

<style>
  .form-element {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .input-wrapper {
    width: 75%;
  }
</style>

<form action="/add-topic" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <div class="input-wrapper">
      <TextInput
        id="topic"
        type="text"
        label="Topic Title"
        bind:value={topicTitle}
        required
        disabled={formDisabled}
      />
    </div>
    <Button
      type="submit"
      variant={buttonVariant}
      icon="📃"
      label="Create"
    />
  </div>
</form>