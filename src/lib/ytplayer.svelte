<script lang="ts">
  import YouTube from "svelte-youtube";
  import Arrow from "./arrow.svelte";
  import PlayArrow from "./playarrow.svelte";
  import Soundoff from "./soundoff.svelte";
  import Soundon from "./soundon.svelte";
  import CloseX from "./closeX.svelte";

  export let closePlayer = () => console.log("need to pass closePlayerFunc");
  const playlist = ["HEjusrpQ6qk", "nybwdbb1rG4", "oY7ROFdetNM"];
  let curVidIndex = 0;
  $: curVidId = playlist[curVidIndex];

  const options = {
    height: "390",
    width: "219",
    //  see https://developers.google.com/youtube/player_parameters

    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };
  let player: any, playerState: number, volumeState: number;
  let displayVolume = false,
    rangeTimeout: Timeout | null;

  $: imageUrl = `https://i3.ytimg.com/vi/${curVidId}/maxresdefault.jpg`;
  function handleReady(event) {
    player = event.detail.target;
    playerState = event.detail.target.getPlayerState();
    volumeState = event.detail.target.getVolume();

    event.detail.target.setVolume(0);
    volumeState = 0;
  }

  function handlePlayStateChange(event) {
    playerState = event.detail.target.getPlayerState();
  }

  function replay(event) {
    event.detail.target.playVideo(curVidId);
  }
  function togglePlayState() {
    if (playerState == 2) {
      // 2 equals paused
      player.playVideo();
      return;
    }
    player.pauseVideo();
  }
  function nextVid() {
    curVidIndex = (curVidIndex + 1) % playlist.length;
  }
  function prevVid() {
    curVidIndex = curVidIndex == 0 ? playlist.length - 1 : curVidIndex - 1;
  }

  function toggleSound() {
    let newVolume = volumeState == 0 ? 100 : 0;
    player.setVolume(newVolume);
    volumeState = newVolume;
  }
  function handleVolumeRange(event) {
    const val = event.target.value;
    console.log(val);
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
    rangeTimeout = setTimeout(() => (displayVolume = false), time);
  }
</script>

<div class="outer-wrapper" style={`--image-bg:url('${imageUrl}')`}>
  <div on:click={togglePlayState} class="inner-wrapper blur">
    <div class="top-controls">
      <button
        class="icon-button round"
        on:click|capture|stopPropagation={closePlayer}><CloseX /></button
      >
    </div>
    <div class="controls-right">
      <div class="playlist-navigation">
        <button
          class="icon-button round"
          on:click|capture|stopPropagation={prevVid}><Arrow dir="up" /></button
        >
        <button
          class="icon-button round"
          on:click|stopPropagation|capture={nextVid}
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
    <div>
      <div style="pointer-events:none" class="player-wrapper">
        {#if playerState == 2}
          <div class="play-icon-wrapper"><PlayArrow /></div>
        {/if}
        <YouTube
          class="yt-player"
          on:end={replay}
          on:ready={handleReady}
          on:stateChange={handlePlayStateChange}
          {options}
          videoId={curVidId}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .outer-wrapper {
    background-image: var(--image-bg);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-position: center;
    background-repeat: no-repeat;
    bottom: 0;
  }
  .blur {
    background: rgb(0 0 0 / 30%);
    backdrop-filter: blur(60px);
  }
  .inner-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    display: grid;
    place-content: center;
  }
  .player-wrapper {
    box-shadow: 0 10px 100px rgb(0 0 0 / 05%), 0 4px 20px rgb(0 0 0 / 10%);
    position: relative;
  }
  :global(:root body) {
    box-sizing: border-box;
  }
  :global(:root body *) {
    box-sizing: inherit;
  }
  :global(.yt-player) {
    display: flex;
  }
  :global(iframe) {
    margin: 0;
    padding: 0;
  }
  .controls-right {
    position: absolute;
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
    aspect-ratio: 1/1;
  }
  .play-icon-wrapper {
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    filter: drop-shadow(0 2px 8px rgb(0 0 0 / 60%));
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
