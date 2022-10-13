<script lang="ts">
  import Player from "./Player.svelte";
  import {
    playlist,
    curVidIndex,
    playerState,
    player,
    nextVidIndex,
    prevVidIndex,
    prevVidId,
    nextVidId,
  } from "../store";
  import { getCoverArt } from "../utils";

  function togglePlayState() {
    if (!$player) return;
    if ($playerState == 2) {
      // 2 equals paused
      $player.playVideo();
      playerState.update(() => 1);
      return;
    }
    $player.pauseVideo();
    playerState.update(() => 2);
  }

  let isDragging = false;
  let delta: number = 0;
  let lastPos = 0;

  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  function handlePointerDown(event: any) {
    isDragging = true;
    delta = 0;
    lastPos = event.clientY;
  }
  function handlePointerMove(_: any) {
    if (isTouchDevice()) return; //only should fire if touch is not supported
  }
  function handleTouchMove(event: any) {
    const curY = event.touches[0].clientY;
    delta += curY - lastPos;
    lastPos = curY;
  }

  function handlePointerUp(_: any) {
    isDragging = false;
    if (Math.abs(delta) > 40) {
      const action = delta > 0 ? prevVidIndex : nextVidIndex;
      action();
    }
    lastPos = 0;
    delta = 0;
  }
  function handlePointerLeave(_: any) {
    isDragging = false;
  }
</script>

<div
  class="wrapper"
  style={`--delta:${delta}px`}
  on:touchmove|capture|preventDefault={handleTouchMove}
  on:pointermove|capture|preventDefault={handlePointerMove}
  on:pointerdown|capture|preventDefault={handlePointerDown}
  on:pointerup|capture|preventDefault={handlePointerUp}
  on:pointerleave|capture|preventDefault={handlePointerLeave}
>
  {#if $curVidIndex != 0}
    <div class="prevSlide slide">
      <img src={getCoverArt($prevVidId)} alt="" />
    </div>
  {/if}
  <div class="slide currentSlide" on:click={togglePlayState}>
    <Player />
  </div>
  {#if $curVidIndex < playlist.length}
    <div class="slide nextSlide">
      <img src={getCoverArt($nextVidId)} alt="" />
    </div>
  {/if}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template: 1fr / 1fr;
    height: 100%;
    max-height: 100svh;
    position: relative;
    /* overflow: auto; */
  }
  .slide {
    grid-area: 1/1;
    min-height: 100%;
    height: 100%;
    position: relative;
    transform: translateY(var(--delta, 0));
    /* overflow: hidden; */
  }
  .slide.currentSlide {
    z-index: 2;
  }
  .nextSlide {
    transform: translateY(calc(var(--delta, 0) + 100%));
  }
  .prevSlide {
    transform: translateY(calc(var(--delta, 0) - 100%));
  }
  :global(.yt-player) {
    position: relative;
    z-index: 0;
  }
  :global(.slide.currentSlide > div) {
    height: 100svh;
    width: auto;
    z-index: 0;
    pointer-events: none;
  }
  :global(.currentSlide iframe),
  .slide img {
    /* max-height: 100vh; */
    height: 100%;
    width: auto;
    aspect-ratio: 9/16;
    /* aspect-ratio: 219 / 390; */
  }
  .slide img {
    object-fit: cover;
  }
</style>
