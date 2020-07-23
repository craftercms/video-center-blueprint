import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import { setPlayerSrc } from '../VideoJSPlayer';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  videoWrapper: {
    width: '580px',
    height: '380px',
    margin: 'auto'
  },
}));

export default function VideoJSBasicPlayer(props) {
  const ref = useRef(null);
  const { id, video } = props;
  const classes = useStyles();

  useEffect(() => {
    if (id && video) {
      const player = videojs(id, {});
      setPlayerSrc(player, video);
      return () => {
        player.dispose();
      };
    }
  }, [id, video]);

  return (
    <div className={classes.videoWrapper}>
      <video
        id={id}
        className="video-js vjs-theme-vc"
        preload="auto"
        autoPlay
        width="580"
        height="380"
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

  );
}
