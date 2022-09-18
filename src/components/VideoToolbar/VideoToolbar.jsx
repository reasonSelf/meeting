import './VideoToolbar.css'

export default function videoToolbar(props) {
  return (
    <div className="video-toolbar-wrapper">
      <div>
        <progress className='video-toolbar-progress'
          max={props.duration}
          value={props.currentTime}
          onClick={props.handleProgressClick}
        >
        </progress>
      </div>
      
      <div className='video-toolbar-controls'>
        <div>
          {
            props.isPlay
              ? <button onClick={props.switchVideoState}>pause</button>
              : <button onClick={props.switchVideoState}>play</button>
          }
        </div>

        <div>
          {
            props.isFullscreen
              ? <button onClick={props.switchFullscreenState}>exit fullscreen</button>
              : <button onClick={props.switchFullscreenState}>fullscreen</button>
          }
        </div>
        <div>
          {
            props.isMute
              ? <button onClick={props.switchMuteState}>unmute</button>
              : <button onClick={props.switchMuteState}>mute</button>
          }
        </div>
      </div>
    </div>
  )
}