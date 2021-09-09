<style lang="scss">
  h4 {
    display: none;
    justify-content: space-between;
    background-color: rgba(219, 211, 216, 0.3);
    padding: 0.5rem;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    @media (min-width: 48rem) {
      display: flex;
    }
  }
  .header-cell {
    width: 21%;
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
    &.date-joined {
      width: 16%;
    }
  }
</style>

<h4>
  <span class="header-cell first-name">First Name</span>
  <span class="header-cell last-name">Last Name</span>
  <span class="header-cell username">Username</span>
  <span class="header-cell email">Email</span>
  <span class="header-cell date-joined">Date Joined</span>
</h4>