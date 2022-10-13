<script lang="ts">
  export let channelid: string;
</script>

<svelte:head>
  <script src="https://apis.google.com/js/platform.js"></script>
</svelte:head>

<div
  class="g-ytsubscribe"
  data-channelid={channelid}
  data-theme="dark"
  data-layout="default"
  data-count="hidden"
/>
