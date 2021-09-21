<script>
  import ThumbsSVG from '../../../static/icons/thumbs.svg';
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
    &:hover {
      filter: brightness(1.25);
    }
    :global(svg) {
      fill: #3E6990;
      width: 25px;
    }
    .counter {
      margin-top: -0.1rem;
    }
  }
</style>

<div class="upvote" on:click>
  <ThumbsSVG/>
  <div class="counter">0</div>
</div>