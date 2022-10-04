<script lang="ts">
  import Player from "./lib/ytplayer.svelte";
  let playerOn = false;
</script>

<main>
  <h1>Video Prototype</h1>
  <button on:click={() => (playerOn = !playerOn)}>
    click to watch videos</button
  >
  {#if playerOn}
    <Player closePlayer={() => (playerOn = !playerOn)} />
  {/if}
</main>

<style>
</style>
