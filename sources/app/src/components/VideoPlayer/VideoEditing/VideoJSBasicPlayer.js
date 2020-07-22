import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import { setPlayerSrc } from '../VideoJSPlayer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import BasicControls from './BasicControls';

const useStyles = makeStyles((theme) => ({
  videoWrapper: {
    width: '580px',
    height: '380px'
  },
  grow: {
    marginTop: '10px'
  }
}));

export default function VideoJSBasicPlayer(props) {
  const ref = useRef(null);
  const classes = useStyles();
  const [player, setPlayer] = useState(null);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const player = videojs(ref.current, {});
    setPlayerSrc(player, props.video);
    setPlayer(player);
  }, []);


  // useEffect(() => {
  //   if(player) {
  //     player.on('loadedmetadata', () => {
  //       props.setDuration(player.duration());
  //     });
  //   }
  // }, [player])

  const onTogglePlay = () => {
    if (player.paused()) {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  };

  const onFullScreen = () => {
    if (!player.isFullscreen()) {
      player.requestFullscreen();
    } else {
      player.exitFullscreen();
    }
  };

  const seek = (secs) => {
    let time = player.currentTime() + secs;
    player.currentTime(time < 0 ? 0 : time);
  };

  const onSetVolume = (volume) => {
    setVolume(volume);
    player.volume(volume);
  };

  return (
    <div>
      <div className={classes.videoWrapper}>
        <video
          className="video-js vjs-theme-vc"
          //controls
          preload="auto"
          width="580"
          height="380"
          //autoPlay
          style={{ width: '100%', height: '100%', margin: 'auto' }}
          ref={ref}
        >
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a
              href="https://videojs.com/html5-video-support/" target="_blank"
              rel="noopener noreferrer"
            >supports HTML5 video</a>
          </p>
        </video>
      </div>
      <BasicControls
        classes={{ grow: classes.grow }}
        onSkipBack={() => seek(-10)}
        onTogglePlay={onTogglePlay}
        isPlaying={isPlaying}
        onSkipForward={() => seek(10)}
        onFullScreen={onFullScreen}
        volume={volume}
        onSetVolume={onSetVolume}
      />
    </div>
  );
}
