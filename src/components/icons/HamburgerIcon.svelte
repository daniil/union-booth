<script>
  export let color;
  export let label;
</script>

<style lang="scss">
  $line-width: 20px;
  $line-height: 3px;
  $offset: 3px;
  $line-color: currentColor;
  @mixin line() {
    display: block;
    content: '';
    width: $line-width;
    height: $line-height;
    border-radius: 4px;
    background-color: $line-color;
  }
  .icon-container {
    display: flex;
    justify-content: center;
    width: $line-width;
    height: ($line-height * 3) + ($offset * 2);
  }
  .hamburger-icon {
    position: relative;
    @include line;
    &::before {
      position: absolute;
      top: $line-height + $offset;
      @include line;
    }
    &::after {
      position: absolute;
      top: ($line-height + $offset) * 2;
      @include line;
    }
  }
</style>

<span class="icon-container">
  <span class="hamburger-icon" role="img" aria-label={label} style="color: {color}"></span>
</span>