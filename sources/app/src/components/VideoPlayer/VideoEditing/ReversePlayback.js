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

import { usePlayer } from './util';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FastRewindRounded from '@material-ui/icons/FastRewindRounded';

const speeds = [500, 300, 100];

export function ReversePlaybackVideoJSAdapter(props) {
  const { id } = props;
  const getPlayer = usePlayer(id);
  const [speed, setSpeed] = useState(-1);
  const ref = useRef(null);
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
    const player = getPlayer();
    clearInterval(ref.current);
    if (speed !== -1) {
      player.pause();
      ref.current = window.setInterval(() => {
        player.currentTime(player.currentTime() - .33);
      }, speeds[speed]);
    } else {
      player.play();
    }
  }, [getPlayer, speed]);
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
