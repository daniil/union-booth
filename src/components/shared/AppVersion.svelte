<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { APP_VERSION } from 'graphql/queries/app-meta';

  const { session } = stores();

  let appVersion;

  const appVersionSub = $session.apolloClient
    .watchQuery({
      query: APP_VERSION,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      if (!data) return;
      appVersion = data.appVersion;
    });
  
  onDestroy(() => appVersionSub.unsubscribe());
</script>

<style>
  h5 {
    font-size: 0.75rem;
    color: rgba(85, 67, 72, 0.7);
  }
</style>

{#if appVersion}
  <h5>v{appVersion}</h5>
{/if}