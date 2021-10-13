<script>
  import AdminLink from 'components/admin/AdminLink.svelte';

  export let details;
</script>

<AdminLink
  href="/admin/topics/{details.slug}"
  title={details.title}
/>