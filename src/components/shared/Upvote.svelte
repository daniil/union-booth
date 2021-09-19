<script>
  import ThumbsSVG from '../../../static/icons/thumbs.svg';
</script>

<style lang="scss">
  .upvote {
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    width: calc(100% + 1rem);
    height: calc(100% + 1rem);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.75rem;
    opacity: 0;
    transform: scale(0.95);
    background-color: rgba(255, 255, 255, 0.75);
    transition: opacity 0.25s ease-out, transform 0.25s ease-out;
    color: transparent;
    &:hover {
      cursor: pointer;
      opacity: 1;
      transform: scale(1);
    }
    :global(svg) {
      fill: #3E6990;
    }
  }
</style>

<div class="upvote" on:click>
  <ThumbsSVG width="75"/>
</div>