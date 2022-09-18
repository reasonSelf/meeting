import {useState} from "react";

function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  function updateFullscreen() {
    setIsFullscreen(!isFullscreen);
  }

  return {
    isFullscreen: isFullscreen,
    updateFullscreen: updateFullscreen
  }
}

function usePlay() {
  const [isPlay, setIsPlay] = useState(false);
  return 
}

export default {
  useFullscreen: useFullscreen,
  usePlay: usePlay
}