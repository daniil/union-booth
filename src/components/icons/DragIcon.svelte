<script>
  import IconSVG from '../../../static/icons/icon-drag.svg';

  export let isHovered;
</script>

<style lang="scss">
  .drag-icon {
    :global(svg) {
      display: block;
      fill: rgba(85, 67, 72, 0.5);
      margin-left: -7px;
    }
    &.is-hovered {
      :global(svg) {
        fill: rgba(85, 67, 72, 0.85);
      }
    }
  }
</style>

<div class="drag-icon" class:is-hovered={isHovered}>
  <IconSVG width="24"/>
</div>