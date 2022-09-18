import './VideoToolbar.css'

export default function videoToolbar(props) {
  return (
    <div className="video-toolbar-wrapper">
      <div>
        <progress style={{width: '100%'}}></progress>
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
      </div>
    </div>
  )
}