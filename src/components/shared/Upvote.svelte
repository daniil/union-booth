<script>
  import ThumbsSVG from '../../../static/icons/thumbs.svg';

  export let isUpvoting;
  export let flipped;
</script>

<style lang="scss">
  .upvote {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    position: relative;
    top: 0.1rem;
    right: -0.4rem;
    font-size: 0.65rem;
    font-weight: 500;
    color: #3E6990;
    @media (min-width: 48rem) {
      font-size: 0.75rem;
    }
    &.triggered {
      pointer-events: none;
      :global(svg) {
        opacity: 0;
        transform: scale(0.9);
      }
    }
    &.flipped {
      :global(svg) {
        transform: rotate(180deg);
      }
    }
    &:hover {
      filter: brightness(1.25);
    }
    :global(svg) {
      fill: #3E6990;
      width: 25px;
      transition: opacity 0.35s, transform 0.25s;
    }
    .counter {
      margin-top: -0.1rem;
    }
  }
</style>

<div
  class="upvote"
  class:triggered={isUpvoting}
  class:flipped
  on:click
>
  <ThumbsSVG/>
  <div class="counter">0</div>
</div>