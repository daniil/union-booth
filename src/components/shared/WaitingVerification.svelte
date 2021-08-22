<style lang="scss">
  .verification-msg {
    padding: 1rem 0 2rem;
    text-align: center;
    color: #7D6D61;
    font-size: 1.1rem;
  }
  .verification-illustration {
    display: block;
    width: 350px;
    margin: 0 auto 4rem;
  }
  .verification-detail {
    text-align: center;
    color: #7D6D61;
    font-size: 0.85rem;
    max-width: 400px;
    margin: 0 auto;
    padding: 0 2rem;
    @media (min-width: 48rem) {
      max-width: initial;
      padding: 0;
    }
  }
</style>

<p class="verification-msg">This account requires verification</p>
<img src="images/needs-verification.svg" alt="Woman waiting for task to complete" class="verification-illustration"/>
<p class="verification-detail">Please wait for the admin of the cohort to activate your account</p>