<script lang="ts">
  import PlayArrow from "./playarrow.svelte";
  import Controls from "./Controls.svelte";
  import Carousel from "./Carousel.svelte";

  const playlist = ["HEjusrpQ6qk", "nybwdbb1rG4", "oY7ROFdetNM", "HEjusrpQ6qk"];
  export let closePlayer: () => void;
  let curVidIndex = 0;
  $: curVidId = playlist[curVidIndex];
  $: nextVidId = playlist[(curVidIndex + 1) % playlist.length];
  $: prevVidId =
    playlist[curVidIndex == 0 ? playlist.length - 1 : curVidIndex - 1];

  let player: any, playerState: number, volumeState: number;

  $: imageUrl = `https://i3.ytimg.com/vi/${curVidId}/maxresdefault.jpg`;

  function handleReady(event: any) {
    player = event.detail.target;
    playerState = event.detail.target.getPlayerState();
    volumeState = event.detail.target.getVolume();
    //TODO: please remove this
    volumeState = 0;
    event.detail.target.setVolume(0);

    event.detail.target.click();
  }

  function handlePlayStateChange(event: any) {
    playerState = event.detail.target.getPlayerState();
  }

  function replay(event: any) {
    event.detail.target.playVideo(curVidId);
  }
  $: playerState, console.log(playerState);
  function togglePlayState() {
    console.log(playerState);
    if (playerState == 2) {
      // 2 equals paused
      player.playVideo();
      playerState = 1;
      return;
    }
    player.pauseVideo();
    playerState = 2;
  }

  function nextVid() {
    console.log("next video ");
    curVidIndex = (curVidIndex + 1) % playlist.length;
  }
  function prevVid() {
    curVidIndex = curVidIndex == 0 ? playlist.length - 1 : curVidIndex - 1;
  }
  let isDragging: boolean;
</script>

<div class="outer-wrapper" style={`--image-bg:url('${imageUrl}');`}>
  <div class="inner-wrapper blur">
    <Controls {closePlayer} {volumeState} {player} {nextVid} {prevVid} />
    <div class="player-wrapper">
      {#if playerState == 2}
        <div class="play-icon-wrapper"><PlayArrow /></div>
      {/if}
      <Carousel
        {player}
        {togglePlayState}
        handleOnReady={handleReady}
        handleOnEnd={replay}
        handleOnPlayStateChange={handlePlayStateChange}
        currentVidIndex={curVidIndex}
        {playlist}
        goToNext={nextVid}
        goToPrev={prevVid}
      />
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
  /* :global(.yt-player) { */
  /*   display: flex; */
  /* } */
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
  }
</style>
