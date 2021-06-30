<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { stores } from '@sapper/app';
  import { parseMD } from 'utils/markdown';
  import roleMap from 'utils/role-map';
  import { formatDate, formatTime } from 'utils/time';
  import Avatar from 'components/Avatar.svelte';
  import MeatballIcon from 'components/MeatballIcon.svelte';

  export let details;

  const { session } = stores();

  let navVisible = false;

  $: content = parseMD(details.answer);
  $: date = formatDate(details.createdAt);
  $: time = formatTime(details.createdAt);
  $: isOwner = $session.user.id === details.user.id;
  $: questionActionsEnabled = roleMap[$session.user.role].includes('moderator') || isOwner;

  const handleActionDropdown = () => {
    navVisible = !navVisible;
  }
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
    position: relative;
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
  .trigger-action {
    background: transparent;
    border: none;
    cursor: pointer;
    &:hover {
      filter: brightness(1.25);
    }
  }
  time {
    display: flex;
    justify-content: space-between;
    color: rgba(1, 22, 56, 0.75);
    font-size: 0.8rem;
  }
  .answer-actions-nav-wrapper {
    position: absolute;
    top: 90%;
    right: 0;
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
        <button class="trigger-action" on:click={handleActionDropdown}>
          <MeatballIcon color="#05668D" label="Actions"/>
        </button>
      {/if}
      {#if navVisible}
        <div class="answer-actions-nav-wrapper" transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
          Answer Nav
        </div>
      {/if}
    </div>
    <time>
      <span>{time}</span>
      <span>{date}</span>
    </time>
  </div>
</div>
