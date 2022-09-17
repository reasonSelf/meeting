import { v4 as uuidv4 } from 'uuid';
import gean from '../media/asoul_gean.mp4'

export default function Video() {
  const videoID = uuidv4();

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
    console.log(`metadata loaded at ${new Date().getTime()}`);
    updateVideoTime();
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

  function handleOnProgress() {
    console.log(`video in progress`);
    updateVideoTime();
  }


  
  function playVideo() {
    const video = document.getElementById(videoID);
    video.play();
  }

  function pauseVideo() {
    const video = document.getElementById(videoID);
    video.pause();
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
        <progress id='progress' max="100"></progress>
      </div>
      
      <div>
        <button onClick={joinMeeting}>join meeting</button>
      </div>
      <div>
        <button onClick={playVideo}>play video</button>
      </div>
      <div>
        <button onClick={pauseVideo}>pause</button>
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