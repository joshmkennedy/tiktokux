<script lang="ts">
  import PlaylistPlayer from "./lib/PlaylistOverlay.svelte";
  let playerOn = false;
</script>

<main>
  <h1>Video Prototype</h1>
  <button on:click={() => (playerOn = !playerOn)}>
    click to watch videos</button
  >
  {#if playerOn}
    <PlaylistPlayer closePlayer={() => (playerOn = !playerOn)} />
  {/if}
</main>

<style>
</style>
