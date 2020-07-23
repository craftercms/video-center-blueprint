import { usePlayer } from './util';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FastRewindRounded from '@material-ui/icons/FastRewindRounded';

const speeds = [500, 300, 100];

export function ReversePlaybackVideoJSAdapter(props) {
  const { id } = props;
  const player = usePlayer(id);
  const [speed, setSpeed] = useState(-1);
  const ref = useRef();
  const reversing = speed !== -1;
  const onReverse = () => {
    const nextSpeed = speed + 1;
    if (nextSpeed > 2) {
      setSpeed(-1);
    } else {
      setSpeed(nextSpeed);
    }
  };
  useEffect(() => {
    const p = player();
    clearInterval(ref.current);
    // debugger
    if (speed !== -1) {
      p.pause();
      ref.current = window.setInterval(() => {
        p.currentTime(p.currentTime() - .33);
      }, speeds[speed]);
    } else {
      p.play();
    }
  }, [speed]);
  return (
    <ReversePlayback onReverse={onReverse} isReversing={reversing} />
  );
}

function ReversePlayback(props) {
  const { onReverse } = props;
  return (
    <>
      <Typography variant="subtitle1" color="inherit">Reverse Playback</Typography>
      <div>
        <IconButton onClick={onReverse}>
          <FastRewindRounded />
        </IconButton>
      </div>
    </>
  );
}
