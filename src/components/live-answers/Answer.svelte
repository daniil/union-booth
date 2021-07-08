<script>
  import { format } from 'timeago.js';
  import { stores } from '@sapper/app';
  import { parseMD } from 'utils/markdown';
  import roleMap from 'utils/role-map';
  import { formatDate, formatTime } from 'utils/time';
  import Avatar from 'components/shared/Avatar.svelte';
  import AnswerActions from 'components/live-answers/AnswerActions.svelte';

  export let details;

  const { session } = stores();

  $: content = parseMD(details.answer);
  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
  $: isOwner = $session.user.id === details.user.id;
  $: questionActionsEnabled = roleMap[$session.user.role].includes('moderator') || isOwner;
  $: lastUpdated = format(details.updatedAt, 'en_US');
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
    > :global(p) {
      margin-top: 0;
    }
  }
  time {
    display: flex;
    justify-content: space-between;
    color: rgba(1, 22, 56, 0.75);
    font-size: 0.8rem;
  }
  .last-updated {
    margin-left: 1rem;
    opacity: 0.75;
    font-size: 0.65rem;
    font-style: italic;
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
    <time>
      <span>
        {time}
        {#if details.createdAt !== details.updatedAt}
          <span class="last-updated">Last updated {lastUpdated}</span>
        {/if}
      </span>
      <span>{date}</span>
    </time>
  </div>
</div>
