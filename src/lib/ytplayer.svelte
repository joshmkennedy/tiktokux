<script lang="ts">
  import YouTube from "svelte-youtube";

  const playlist = "";
  let curVidIndex = 0;

  $: curVidId = playlist[curVidIndex];

  const options = {
    height: "390",
    width: "640",
    //  see https://developers.google.com/youtube/player_parameters
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist = curVidId,
    },
  };
</script>

<YouTube {options} videoId="HEjusrpQ6qk" />
