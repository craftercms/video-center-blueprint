import React, { useEffect } from 'react';
import videojs from 'video.js';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  videoWrapper: {
    width: '100%',
    minHeight: '380px',
    margin: 'auto',
    background: '#000'
  }
}));

export default function VideoJSBasicPlayer(props) {
  const { id, options = {} } = props;
  const classes = useStyles();

  useEffect(() => {
    videojs(id, {
      liveui: true,
      responsive: true,
      ...options
    });
    return () => {
      const p = videojs.getPlayer(id);
      p && p.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${classes.videoWrapper} ${props.classes?.root}`}>
      <video
        id={id}
        className={`video-js vjs-theme-vc ${props.classes?.video}`}
        preload="auto"
        autoPlay
      >
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a
            target="_blank"
            href="https://videojs.com/html5-video-support/"
            rel="noopener noreferrer"
          >
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
  );
}
