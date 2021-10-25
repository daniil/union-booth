<script>
  export let pointDown;
</script>

<style lang="scss">
  .collapse-btn {
    display: flex;
    border: none;
    height: 0;
    padding: 0.75rem 1rem;
    margin: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    &:hover {
      filter: brightness(1.25);
    }
  }
  .collapse-icon {
    display: inline-block;
    transform: translateX(-2px) rotate(-90deg);
    color: #3E6990;
    font-size: 2rem;
    line-height: 0;
    &.is-down {
      transform: translateX(1px) rotate(90deg);
    }
  }
</style>

<button class="collapse-btn" on:click>
  <span class="collapse-icon" class:is-down={pointDown}>&rsaquo;</span>
</button>