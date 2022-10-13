<script lang="ts">
  import PlayArrow from "./playarrow.svelte";
  import Controls from "./Controls.svelte";
  import Carousel from "./Carousel.svelte";

  import { playerState, curVidId } from "../store";
  import { getCoverArt } from "../utils";

  export let closePlayer: () => void;

  $: imageUrl = getCoverArt($curVidId);
</script>

<div class="outer-wrapper" style={`--image-bg:url('${imageUrl}');`}>
  <div class="inner-wrapper blur">
    <Controls {closePlayer} />
    <div class="player-wrapper">
      {#if $playerState == 2}
        <div class="play-icon-wrapper"><PlayArrow /></div>
      {/if}
      <Carousel />
    </div>
  </div>
</div>

<style>
  :global(html) {
    overflow: hidden;
  }
  .outer-wrapper {
    background-image: var(--image-bg);
    position: fixed;
    top: 0;
    left: 0;
    /* right: 0; */
    background-position: center;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100svh;
    overflow: hidden;
  }
  .blur {
    background: rgb(0 0 0 / 30%);
    backdrop-filter: blur(60px);
    -webkit-backdrop-filter: blur(60px);
  }
  .inner-wrapper {
    width: 100%;
    height: 100%;
    bottom: 0;
    position: absolute;
    display: grid;
    place-content: center;
  }
  .player-wrapper {
    position: relative;
  }
  :global(:root body) {
    box-sizing: border-box;
  }
  :global(:root body *) {
    box-sizing: inherit;
  }
  :global(iframe) {
    margin: 0;
    padding: 0;
  }
  .play-icon-wrapper {
    z-index: 9;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    filter: drop-shadow(0 2px 8px rgb(0 0 0 / 60%));
    pointer-events: none;
  }
</style>
