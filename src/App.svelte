<script lang="ts">
  import Player from "./lib/ytplayer.svelte";
  import Carousel from "./lib/Carousel.svelte";
  let playerOn = false;

  const slides = ["a", "b", "c", "d"];
  let curSlideId = 0;
  // $: curSlideId, console.log(curSlideId);
  const next = () => (curSlideId = (curSlideId + 1) % slides.length);
  const prev = () => {
    console.log("hi");
    const nextSlide = curSlideId == 0 ? slides.length - 1 : curSlideId - 1;
    console.log(nextSlide);
    curSlideId = nextSlide;
  };
</script>

<main>
  <h1>Video Prototype</h1>
  <button on:click={() => (playerOn = !playerOn)}>
    click to watch videos</button
  >
  <!-- {#if playerOn} -->
  <Player closePlayer={() => (playerOn = !playerOn)} />
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
