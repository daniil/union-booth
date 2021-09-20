<script>
  import ThumbsSVG from '../../../static/icons/thumbs.svg';
</script>

<style lang="scss">
  .upvote {
    cursor: pointer;
    color: transparent;
    &:hover {
      filter: brightness(1.25);
    }
    :global(svg) {
      fill: #3E6990;
      position: relative;
      top: 0.1rem;
      right: -0.7rem;
      width: 35px;
    }
  }
</style>

<div class="upvote" on:click>
  <ThumbsSVG/>
</div>