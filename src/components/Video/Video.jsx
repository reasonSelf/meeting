import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import gean from '../../media/asoul_gean.mp4'
import VideoToolbar from '../VideoToolbar/VideoToolbar'
import './Video.css'

export default function Video() {
  const [videoID] = useState(uuidv4());

  const {isPlay, switchVideoState} = useIsPlay(videoID);
  const {isFullscreen, switchFullscreenState} = useIsFullscreen(videoID);
  const {volume, setVolume} = useVolumn(videoID);
  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControl, setShowControl] = useState(false);
  const [clientX, setClinetx] = useState(0);

  function handleOnLoadedMetadata() {
    const video = document.getElementById(videoID);
    setDuration(video.duration);
    setCurrentTime(0);
  }

  function handleOnSeeked() {
    console.log('video seeked')
  }

  function handleOnCanplay() {
    console.log(`video canplay at ${new Date().getTime()}`);
  }

  function handleOnStalled() {
    console.log(`can not fetch video, try again!`);
  }

  function handleOnProgress(event) {
    // const video = document.getElementById(videoID);
    // setCurrentTime(video.currentTime);
  }

  function handleVideoClick() {
    switchVideoState();
  }
  
  function handleProgressClick(event) {
    const pos = (event.clientX - event.target.offsetLeft) / event.target.clientWidth;
    const video = document.getElementById(videoID);
    video.currentTime = pos * video.duration;
    setCurrentTime(video.currentTime);
  }

  function handleTimeUpdate() {
    const video = document.getElementById(videoID);
    setCurrentTime(video.currentTime);
  }

  function handleOnKeyDown(event) {
    const key = event.key;
    console.log(key);

    const video = document.getElementById(videoID);
    switch (key) {
      case ' ':
        switchVideoState();
        break;
      case 'ArrowRight':
        video.currentTime = video.currentTime + 5;
        break;
      case 'ArrowLeft':
        video.currentTime = video.currentTime - 5;
        break;
      case 'ArrowUp':
        setVolume(volume + 0.1 > 1 ? 1 : volume + 0.1);
        break;
      case 'ArrowDown':
        setVolume(volume - 0.1 < 0 ? 0 : volume - 0.1);
        break;
      default:
        break;
    }
  }

  function handlemouseMove(event) {
    setShowControl(true);
    setClinetx(event.clientX)
  }

  const toolbarParams = {
    duration: duration,
    currentTime: currentTime,
    isPlay: isPlay,
    switchVideoState: switchVideoState,
    isFullscreen: isFullscreen,
    switchFullscreenState: switchFullscreenState,
    handleProgressClick: handleProgressClick,
    volume: volume,
    setVolume: setVolume
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControl(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }, [showControl, clientX])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>

      <video 
        style={{ backgroundColor: 'black' }}
        className="video-wrapper"
        id={videoID} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleOnLoadedMetadata}
        onSeeked={handleOnSeeked}
        onCanPlay={handleOnCanplay}
        onStalled={handleOnStalled}
        onProgress={handleOnProgress}
        onClick={handleVideoClick}
        onKeyDown={handleOnKeyDown}
        onMouseMove={handlemouseMove}
        tabIndex="0"
        src={gean}> 
      </video>

      {
        showControl ? <VideoToolbar {...toolbarParams} /> : null
      }
    </div>
  )
}

function useIsPlay(videoID) {
  const [isPlay, setIsPlay] = useState(false);

  const switchVideoState = () => {
    setIsPlay(!isPlay);
  }

  useEffect(() => {
    const video = document.getElementById(videoID);
    if (isPlay) {
      video.play();
    } else {
      video.pause();
    }
  })

  return {
    isPlay: isPlay,
    switchVideoState: switchVideoState
  }
}

function useIsFullscreen(videoID) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const switchFullscreenState = () => {
    setIsFullscreen(!isFullscreen);
  }

  const handleFullscreenChange = () => {
    setIsFullscreen(!isFullscreen);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }

  useEffect(() => {
    const video = document.getElementById(videoID);

    if (video) {
      if (isFullscreen) {
        video.requestFullscreen();
        document.addEventListener('fullscreenchange', handleFullscreenChange)
      } 
    }
  })

  return {
    isFullscreen: isFullscreen,
    switchFullscreenState: switchFullscreenState
  }
}

function useVolumn(videoID) {
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const video = document.getElementById(videoID);
    video.volume = volume;
  })

  return {
    volume: volume,
    setVolume: setVolume
  }
}