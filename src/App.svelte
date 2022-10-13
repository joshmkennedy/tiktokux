<script lang="ts">
  import PlaylistPlayer from "./lib/PlaylistOverlay.svelte";
  let playerOn = false;
</script>

<main>
  <h1>Video Prototype</h1>
  <button on:click={() => (playerOn = !playerOn)}>
    click to watch videos</button
  >
  <!-- {#if playerOn} -->
  <PlaylistPlayer closePlayer={() => (playerOn = !playerOn)} />
  <!-- {/if} -->
  <!-- <Carousel -->
  <!--   curSlide={slides[curSlideId]} -->
  <!--   nextSlide={curSlideId == slides.length - 1 ? null : slides[curSlideId + 1]} -->
  <!--   prevSlide={curSlideId == 0 ? null : slides[curSlideId - 1]} -->
  <!--   goToNext={next} -->
  <!--   goToPrev={prev} -->
  <!-- /> -->
</main>

<style>
</style>
