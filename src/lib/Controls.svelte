<script lang="ts">
  import Arrow from "./arrow.svelte";
  import CloseX from "./closeX.svelte";
  import Soundoff from "./soundoff.svelte";
  import Soundon from "./soundon.svelte";

  export let closePlayer = () => console.log("need to pass closePlayerFunc");
  export let player: any;
  export let prevVid: () => void;
  export let nextVid: () => void;
  export let volumeState: number;

  let displayVolume = false;
  let rangeTimeout = null;

  function toggleSound() {
    let newVolume = volumeState == 0 ? 100 : 0;
    player.setVolume(newVolume);
    volumeState = newVolume;
  }

  function handleVolumeRange(event: any) {
    const val = event.target.value;
    player.setVolume(val);
    volumeState = val;
  }

  function showVolumeRange() {
    displayVolume = true;
  }

  function hideVolumeRange() {
    displayVolume = false;
  }

  function hideRangeAfter(time: number) {
    if (rangeTimeout) {
      clearTimeout(rangeTimeout);
    }
    rangeTimeout = window.setTimeout(() => (displayVolume = false), time);
  }
</script>

<div class="top-controls">
  <button
    class="icon-button round"
    on:click|capture|stopPropagation={closePlayer}><CloseX /></button
  >
</div>

<div class="controls-right">
  <div class="playlist-navigation">
    <button class="icon-button round" on:click|capture|stopPropagation={prevVid}
      ><Arrow dir="up" /></button
    >
    <button class="icon-button round" on:click|stopPropagation|capture={nextVid}
      ><Arrow dir="down" /></button
    >
  </div>

  <div
    on:mouseenter={showVolumeRange}
    on:mouseleave={hideVolumeRange}
    class="sound"
  >
    {#if displayVolume}
      <div class="sound-scale">
        <input
          type="range"
          on:click|stopPropagation|capture={() => hideRangeAfter(5000)}
          on:change|capture|stopPropagation={(event) => {
            handleVolumeRange(event);
            hideRangeAfter(5000);
          }}
          bind:value={volumeState}
          min="0"
          max="100"
          step="10"
        />
      </div>
    {/if}
    <button
      class="icon-button"
      on:click|stopPropagation|capture={() => {
        toggleSound();
        hideRangeAfter(5000);
      }}
    >
      {#if volumeState == 0}
        <Soundoff />
      {:else}
        <Soundon />
      {/if}
    </button>
  </div>
</div>

<style>
  .controls-right {
    z-index: 4;
    position: fixed;
    right: 0;
    bottom: 0;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .playlist-navigation {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1rem;
  }
  .top-controls {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
  }
  button {
    background: #efefef22;
  }
  button.icon-button {
    padding: 0;
    width: 40px;
    height: 40px;
    display: grid;
    place-content: center;
  }
  button.round {
    border-radius: 50%;
    aspect-ratio: 1 / 1;
  }
  .sound {
    display: flex;
    flex-direction: column;
    max-width: 40px;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .sound-scale {
    background: #efefef22;
    padding-inline: 4px;
    padding-top: 4px;
    border-radius: 4px;
    top: 50%;
    left: 0%;
    transform: rotate(-90deg) translateY(-50%) translateX(calc(50% - 20px));
    transform-origin: center top;
  }
</style>
