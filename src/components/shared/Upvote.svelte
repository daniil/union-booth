<script>
  import ThumbsSVG from '../../../static/icons/thumbs.svg';
</script>

<style lang="scss">
  .upvote {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    bottom: 0;
    width: auto;
    height: auto;
    padding: 0;
    border-radius: 0.75rem;
    background-color: transparent;
    cursor: pointer;
    color: transparent;
    &:hover {
      filter: brightness(1.25);
    }
    :global(svg) {
      fill: #3E6990;
      position: relative;
      top: 0.6rem;
      left: 0.7rem;
      width: 35px;
    }
  }
</style>

<div class="upvote" on:click>
  <ThumbsSVG/>
</div>