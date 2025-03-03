import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import '../assets/styles/VideoPlay.css'
import playV from '../assets/icon/playv.png'
import pauseV from '../assets/icon/pause-circle-outline.png'
import reR from '../assets/icon/fast-forward-10.png'
import reL from '../assets/icon/rewind-10.png'
import Max from '../assets/icon/fullscreen.png'
import Vol from '../assets/icon/volume-high.png'


const VideoPlayer = ({Film,Trailer}) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [audioTrack, setAudioTrack] = useState("Bahasa Inggris");
  const [subtitle, setSubtitle] = useState("Bahasa Indonesia");
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => setPlaying(!playing);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && playerRef.current) {
      screenfull.request(playerRef.current.wrapper);
    }
  };
  const rewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10, "seconds");
    }
  };
  
  const forward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, "seconds");
    }
  };
  


  return (
    <div
      className="video-container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={Trailer}
        playing={playing}
        controls={false}
        width="100%"
        height="100%"
        volume={volume}
        onClick={togglePlay}
      />

      {!playing && (
        <button className="pause-button" onClick={togglePlay}>
          &#10074;&#10074;
        </button>
      )}

      {showControls && (
        <div className="video-controls">
          <p>{Film.movie}</p>
          <div className="subtitle-options">
            <div className="dropdown">
              <span>Audio: {audioTrack}</span>
              <div className="dropdown-content">
                <p onClick={() => setAudioTrack("Bahasa Inggris")}>Bahasa Inggris</p>
              </div>
            </div>
            <div className="dropdown">
              <span>Terjemahan: {subtitle}</span>
              <div className="dropdown-content">
                <p onClick={() => setSubtitle("Bahasa Indonesia")}>Bahasa Indonesia</p>
                <p onClick={() => setSubtitle("Bahasa Inggris")}>Bahasa Inggris</p>
              </div>
            </div>
          </div>
          <div className="bottom-controls">
            <div className="peng">
                <button onClick={togglePlay}>{playing ? <img src={pauseV} alt="" className="imgplay" />  : <img src={playV} alt="" className="imgplay" />}</button>
                <button onClick={rewind}><img src={reL} alt="" className="imgplay" /></button>
                <button onClick={forward}><img src={reR} alt="" className="imgplay" /></button>
            </div>
            <div className="volpe">
            <img src={Vol} alt="" className="imgplay" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
            </div>
            <button onClick={toggleFullscreen}><img src={Max} alt=""className="imgplay"/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
