<script lang="ts">
  import YouTube from "svelte-youtube";
  import { player, playerState, volumeState, curVidId } from "../store";

  function handleReady(event: any) {
    player.update(() => event.detail.target);
    playerState.update(() => event.detail.target.getPlayerState());
    volumeState.update(() => event.detail.target.getVolume());
    //TODO: please remove this
  }

  function handlePlayStateChange(event: any) {
    playerState.update(() => event.detail.target.getPlayerState());
  }

  function replay(event: any) {
    event.detail.target.playVideo($curVidId);
  }
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
</script>

<YouTube
  {options}
  videoId={$curVidId}
  on:ready={handleReady}
  on:stateChange={handlePlayStateChange}
  on:end={replay}
/>
