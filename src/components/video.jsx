import { v4 as uuidv4 } from 'uuid';

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

  return (
    <div>
      <video id={videoID} width="400" height="400" autoPlay>

      </video>
      <div>
        <button onClick={joinMeeting}>join meeting</button>
      </div>
    </div>
  )
}