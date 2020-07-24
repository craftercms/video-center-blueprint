/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import makeStyles from '@material-ui/core/styles/makeStyles';
import '../video-js/ControlBar';

const useStyles = makeStyles(() => ({
  videoWrapper: {
    // width: '100%',
    minHeight: '200px',
    margin: 'auto',
    // background: '#000'
  },
  video: {
    maxHeight: '60vh'
  }
}));

export default React.forwardRef(function Player(props, ref) {
  const { id, options = {} } = props;
  const classes = useStyles();
  const videoRef = useRef();
  useEffect(() => {
    const player = videojs(id, {
      liveui: true,
      responsive: true,
      autoplay: true,
      muted: true,
      preload: 'auto',
      fluid: true,
      aspectRatio: '16:9',
      children: [
        'mediaLoader',
        'posterImage',
        'textTrackDisplay',
        'loadingSpinner',
        'bigPlayButton',
        'liveTracker',
        'customControlBar',
        'errorDisplay',
        'textTrackSettings',
        'resizeManager'
      ],
      ...options
    });
    if (ref) {
      const result = { player, video: videoRef.current };
      if (typeof ref === 'function') {
        ref(result);
      } else {
        ref.current = ref;
      }
    }
    return () => {
      player.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${classes.videoWrapper} ${props.classes?.root}`}>
      <video
        id={id}
        ref={videoRef}
        className={`video-js vjs-theme-vc ${classes.video} ${props.classes?.video}`}
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
});
