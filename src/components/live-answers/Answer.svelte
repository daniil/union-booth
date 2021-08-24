<script>
  import { stores } from '@sapper/app';
  import { parseMD } from 'utils/markdown';
  import roleMap from 'utils/role-map';
  import Avatar from 'components/shared/Avatar.svelte';
  import AnswerActions from 'components/live-answers/AnswerActions.svelte';
  import PostTimestamp from 'components/shared/PostTimestamp.svelte';

  export let details;

  const { session } = stores();

  $: content = parseMD(details.answer);
  $: isOwner = $session.user.id === details.user.id;
  $: questionActionsEnabled = roleMap[$session.user.role].includes('moderator') || isOwner;
</script>

<style lang="scss">
  .answer {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  .answer-text {
    flex-grow: 1;
  }
  .content-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  h4 {
    margin-bottom: 0;
    font-size: 0.9rem;
    @media (min-width: 48rem) {
      font-size: 1rem;
    }
    > :global(p) {
      margin-top: 0;
    }
  }
</style>

<div class="answer">
  <Avatar
    user={details.user}
    alt={`Posted by: ${details.user.firstName} ${details.user.lastName}`}
  />
  <div class="answer-text">
    <div class="content-container">
      <h4>{@html content}</h4>
      {#if questionActionsEnabled}
        <AnswerActions
          answerId={details.id}
          {isOwner}
          on:edit
        />
      {/if}
    </div>
    <PostTimestamp {details} reduced/>
  </div>
</div>
