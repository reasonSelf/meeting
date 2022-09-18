import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import gean from '../../media/asoul_gean.mp4'
import VideoToolbar from '../VideoToolbar/VideoToolbar'

export default function Video() {
  const videoID = uuidv4();
  const {isPlay, switchVideoState} = useIsPlay(videoID);
  const {isFullscreen, switchFullscreenState} = useIsFullscreen(videoID);
  const {isMute, switchMuteState} = useIsMute(videoID);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  function joinMeeting() {
    navigator.mediaDevices.getUserMedia({
        video: true
      })
      .then(stream => {
        document.getElementById(videoID).srcObject = stream;
      })
      .catch(error => {
        console.error(error);
      })
  }

  function handleOnLoadedMetadata() {
    updateVideoTime();
    const video = document.getElementById(videoID);
    setDuration(video.duration);
    setCurrentTime(0);
  }

  function updateVideoTime() {
    const video = document.getElementById(videoID);
    const progress = document.getElementById('progress');
    progress.setAttribute('max', video.duration);
    progress.value = video.currentTime;
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
    const video = document.getElementById(videoID);
    setCurrentTime(video.currentTime);
    updateVideoTime();
  }

  function handleProgressClick(event) {
    const pos = (event.clientX - event.target.offsetLeft) / event.target.clientWidth;
    const video = document.getElementById(videoID);
    video.currentTime = pos * video.duration;
    setCurrentTime(video.currentTime);
  }

  function handleBackVideoTime() {
    const video = document.getElementById(videoID);
    video.currentTime = video.currentTime - 10;
  }

  function handleGotoVideoTime() {
    const video = document.getElementById(videoID);
    video.currentTime = video.currentTime + 100;    
  }

  return (
    <div>
      <VideoToolbar 
        duration={duration}
        currentTime={currentTime}
        isPlay={isPlay} 
        switchVideoState={switchVideoState}
        isFullscreen={isFullscreen}
        switchFullscreenState={switchFullscreenState}
        isMute={isMute}
        switchMuteState={switchMuteState}
        handleProgressClick={handleProgressClick}
      />

      <video 
        id={videoID} 
        width="400" 
        height="400" 
        onLoadedMetadata={handleOnLoadedMetadata}
        onSeeked={handleOnSeeked}
        onCanPlay={handleOnCanplay}
        onStalled={handleOnStalled}
        onProgress={handleOnProgress}
        src={gean}> 

      </video>

      <div>
        <progress id='progress' max="100" onClick={handleProgressClick}></progress>
      </div>
      
      <div>
        <button onClick={joinMeeting}>join meeting</button>
      </div>
      <div>
        <button onClick={handleBackVideoTime}>back</button>
      </div>
      <div>
        <button onClick={handleGotoVideoTime}>goto</button>
      </div>

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

function useIsMute(videoID) {
  const [isMute, setIsMute] = useState(false);

  const switchMuteState = () => {
    setIsMute(!isMute);
  }

  useEffect(() => {
    const video = document.getElementById(videoID);
    video.muted = isMute;
  })

  return {
    isMute: isMute,
    switchMuteState: switchMuteState
  }
}