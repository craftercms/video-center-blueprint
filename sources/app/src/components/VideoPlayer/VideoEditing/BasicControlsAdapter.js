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

import React, { useEffect, useState } from 'react';
import BasicControls from './BasicControls';
import { usePlayer, useVideoJSIsFullScreen, useVideoJSVolume } from './util';

export default function BasicControlsAdapter(props) {
  const { id } = props;
  const getPlayer = usePlayer(id);
  const [volume, setVolume] = useVideoJSVolume(id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setFullScreen] = useVideoJSIsFullScreen(id);

  useEffect(() => {
    const player = getPlayer();
    if (player) {
      ['play', 'pause'].forEach((e) => {
        player.on(e, () => {
          setIsPlaying(!player.paused());
        });
      });
    }
  }, [getPlayer]);

  const onTogglePlay = () => {
    const player = getPlayer();
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  };

  const onFullScreen = () => {
    setFullScreen(!isFullScreen);
  };

  const seek = (secs) => {
    const player = getPlayer();
    let time = player.currentTime() + secs;
    player.currentTime(time < 0 ? 0 : time);
  };

  return (
    <BasicControls
      classes={props.classes}
      onSkipBack={() => seek(-10)}
      onTogglePlay={onTogglePlay}
      isPlaying={isPlaying}
      onSkipForward={() => seek(10)}
      onFullScreen={onFullScreen}
      volume={volume}
      onSetVolume={setVolume}
    />
  );
}
