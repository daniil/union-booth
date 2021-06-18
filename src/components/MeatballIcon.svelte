<script>
  export let color;
  export let label;
</script>

<style lang="scss">
  $ball-size: 7px;
  $offset: 3px;
  $ball-color: currentColor;
  @mixin ball() {
    display: block;
    content: '';
    width: $ball-size;
    height: $ball-size;
    border-radius: 50%;
    background-color: $ball-color;
  }
  .icon-container {
    display: flex;
    justify-content: center;
    width: ($ball-size * 3) + ($offset * 2);
    height: $ball-size;
  }
  .meatball-icon {
    position: relative;
    @include ball;
    &::before {
      position: absolute;
      left: -$ball-size - $offset;
      @include ball;
    }
    &::after {
      position: absolute;
      left: $ball-size + $offset;
      @include ball;
    }
  }
</style>

<span class="icon-container">
  <span class="meatball-icon" role="img" aria-label={label} style="color: {color}"></span>
</span>