import './VideoToolbar.css'

export default function videoToolbar(props) {
  return (
    <div className="video-toolbar-wrapper">
      <div className='video-toolbar-progress-wrapper'>
        
        <progress className='video-toolbar-progress'
          max={props.duration}
          value={props.currentTime}
          onClick={props.handleProgressClick}
        >
        </progress>
      </div>
      
      <div className='video-toolbar-controls'>
        {
          props.isPlay
            ? <svg onClick={props.switchVideoState}><use href='#pause'></use></svg>
            : <svg onClick={props.switchVideoState}><use href='#play-icon'></use></svg>
        }

        <div className='video-toolbar-progress-item'>
          {
            Number.parseFloat(props.volume) <= 0
              ? <svg><use href='#volume-mute' onClick={ () => { props.setVolume('1') } }></use></svg>
              : <svg><use href='#volume-high' onClick={ () => { props.setVolume('0') } }></use></svg>
          }
          <input
            type="range" 
            max="1" 
            min="0" 
            step="0.01"
            value={props.volume}
            onInput={(event) => { props.setVolume(event.target.value) }}
          >
          </input>
        </div>

        <div className='video-toolbar-progress-item' style={{ color: '#fff' }}>
          <time>{ formatTime(props.currentTime) }</time>
          <span> / </span>
          <time>{ formatTime(props.duration) }</time>
        </div>

        <div style={{ flexGrow: '1', justifyContent: 'flex-end', display: 'flex' }}>
          {
            props.isFullscreen
              ? <svg onClick={props.switchFullscreenState}><use href='#fullscreen-exit'></use></svg>
              : <svg onClick={props.switchFullscreenState}><use href="#fullscreen"></use></svg>
          }
        </div>
      </div>

      <svg style={{display: 'none'}}>
        <defs>
          <symbol id="play-icon" viewBox="0 0 24 24">
            <path d="M8.016 5.016l10.969 6.984-10.969 6.984v-13.969z"></path>
          </symbol>

          <symbol id="pause" viewBox="0 0 24 24">
            <path d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z"></path>
          </symbol>

          <symbol id="volume-high" viewBox="0 0 24 24">
            <path d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q1.031 0.516 1.758 1.688t0.727 2.344zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z"></path>
          </symbol>

          <symbol id="volume-low" viewBox="0 0 24 24">
            <path d="M5.016 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6zM18.516 12q0 2.766-2.531 4.031v-8.063q1.031 0.516 1.781 1.711t0.75 2.32z"></path>
          </symbol>

          <symbol id="volume-mute" viewBox="0 0 24 24">
            <path d="M12 3.984v4.219l-2.109-2.109zM4.266 3l16.734 16.734-1.266 1.266-2.063-2.063q-1.547 1.313-3.656 1.828v-2.063q1.172-0.328 2.25-1.172l-4.266-4.266v6.75l-5.016-5.016h-3.984v-6h4.734l-4.734-4.734zM18.984 12q0-2.391-1.383-4.219t-3.586-2.484v-2.063q3.047 0.656 5.016 3.117t1.969 5.648q0 2.203-1.031 4.172l-1.5-1.547q0.516-1.266 0.516-2.625zM16.5 12q0 0.422-0.047 0.609l-2.438-2.438v-2.203q1.031 0.516 1.758 1.688t0.727 2.344z"></path>
          </symbol>

          <symbol id="fullscreen" viewBox="0 0 24 24">
            <path d="M14.016 5.016h4.969v4.969h-1.969v-3h-3v-1.969zM17.016 17.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 9.984v-4.969h4.969v1.969h-3v3h-1.969zM6.984 14.016v3h3v1.969h-4.969v-4.969h1.969z"></path>
          </symbol>

          <symbol id="fullscreen-exit" viewBox="0 0 24 24">
            <path d="M15.984 8.016h3v1.969h-4.969v-4.969h1.969v3zM14.016 18.984v-4.969h4.969v1.969h-3v3h-1.969zM8.016 8.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 15.984v-1.969h4.969v4.969h-1.969v-3h-3z"></path>
          </symbol>

          <symbol id="pip" viewBox="0 0 24 24">
            <path d="M21 19.031v-14.063h-18v14.063h18zM23.016 18.984q0 0.797-0.609 1.406t-1.406 0.609h-18q-0.797 0-1.406-0.609t-0.609-1.406v-14.016q0-0.797 0.609-1.383t1.406-0.586h18q0.797 0 1.406 0.586t0.609 1.383v14.016zM18.984 11.016v6h-7.969v-6h7.969z"></path>
          </symbol>
        </defs>
      </svg>
    </div>
  )
}

function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  return `${result.substr(3, 2)}:${result.substr(6, 2)}`
}