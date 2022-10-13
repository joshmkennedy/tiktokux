<script lang="ts">
  import YouTube from "svelte-youtube";
  import { onMount } from "svelte";

  export let playlist: string[];
  export let goToPrev: () => void;
  export let goToNext: () => void;
  export let currentVidIndex: number = 0;
  export let handleOnEnd: (e: any) => void;
  export let handleOnPlayStateChange: (e: any) => void;
  export let handleOnReady: (e: any) => void;
  export let togglePlayState: () => void;

  $: currentVidIndex, console.log(currentVidIndex);

  const options = {
    height: "390",
    width: "219",
    //  see https://developers.google.com/youtube/player_parameters
    playerVars: {
      autoplay: 1,
      controls: 0,
      playsinline: 1,
      enablejsapi: 1,
      modestbranding: 1,
    },
  };

  export let isDragging = false;
  let delta: number = 0;
  let lastPos = 0;

  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  function handlePointerDown(event) {
    isDragging = true;
    delta = 0;
    lastPos = event.clientY;
  }
  function handlePointerMove(event) {
    if (isTouchDevice()) return; //only should fire if touch is not supported
  }
  function handleTouchMove(event) {
    const curY = event.touches[0].clientY;
    delta += curY - lastPos;
    lastPos = curY;
  }

  function handlePointerUp(event) {
    isDragging = false;
    if (Math.abs(delta) > 40) {
      const action = delta > 0 ? goToPrev : goToNext;
      console.log(action);
      action();
    }
    lastPos = 0;
    delta = 0;
  }
  function handlePointerLeave(event) {
    isDragging = false;
  }
  function getCoverArt(id) {
    if (id) {
      return `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
    }
    return null;
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
  {#if currentVidIndex != 0}
    <div class="prevSlide slide">
      <img src={getCoverArt(playlist[currentVidIndex - 1])} alt="" />
    </div>
  {/if}
  <div class="slide currentSlide" on:click={togglePlayState}>
    <YouTube
      {options}
      on:end={handleOnEnd}
      on:stateChange={handleOnPlayStateChange}
      on:ready={handleOnReady}
      videoId={playlist[currentVidIndex]}
    />
  </div>
  {#if currentVidIndex < playlist.length}
    <div class="slide nextSlide">
      <img src={getCoverArt(playlist[currentVidIndex + 1])} alt="" />
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
