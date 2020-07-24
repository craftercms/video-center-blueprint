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
import videojs from 'video.js';
import BasicControls from './BasicControls';

export default function BasicControlsAdapter(props) {
  const player = videojs.getPlayer(props.id);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (player) {
      ['play', 'pause'].forEach((e) => {
        player.on(e, () => {
          setIsPlaying(!player.paused());
        });
      });
    }
  }, [player]);

  const onTogglePlay = () => {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
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
    <BasicControls
      classes={props.classes}
      onSkipBack={() => seek(-10)}
      onTogglePlay={onTogglePlay}
      isPlaying={isPlaying}
      onSkipForward={() => seek(10)}
      onFullScreen={onFullScreen}
      volume={volume}
      onSetVolume={onSetVolume}
    />
  );
}
