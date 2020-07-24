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
import VideoDurationControl from './VideoDurationControl';
import videojs from 'video.js';
import BoundsControl from './BoundsControl';
import PlayBackTimeControl from './PlayBackTimeControl';
import { formatSeconds } from './util';

export default function ClippingControlsVideoJSAdapter(props) {
  const player = videojs.getPlayer(props.id);
  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [workingBounds, setWorkingBounds] = useState({
    start: 0,
    end: null
  });
  const [clipBounds, setClipBounds] = useState({
    start: 0,
    end: null
  });

  useEffect(() => {
    if (player) {

      player.on('loadedmetadata', () => {
        setDuration(player.duration());
      });

      player.on('play', () => {
        setDuration(player.duration());
      });

      player.on('timeupdate', () => {
        setCurrentTime(player.currentTime());
      });
    }
  }, [player]);

  const onSetTime = (time) => {
    setCurrentTime(time);
    player.currentTime(time);
  };

  const onSetWorkingBounds = (value) => {
    setWorkingBounds({ start: value[0], end: value[1] });
  };

  const onSetClipBounds = (value) => {
    setClipBounds({ start: value[0], end: value[1] });
  };

  return (
    <section className={props.classes?.controls}>
      <div className={props.classes?.control}>
        <VideoDurationControl duration={formatSeconds(duration)} />
      </div>
      <div className={props.classes?.control}>
        <BoundsControl
          start={workingBounds.start}
          end={workingBounds.end ?? duration}
          max={duration}
          onChange={onSetWorkingBounds}
          label="Working bounds"
        />
      </div>
      <div className={props.classes?.control}>
        <PlayBackTimeControl
          currentTime={currentTime}
          max={duration}
          onChange={onSetTime}
          label="Playback Time"
        />
      </div>
      <div className={props.classes?.control}>
        <BoundsControl
          start={clipBounds.start}
          end={clipBounds.end ?? duration}
          max={(workingBounds.end ?? duration) - workingBounds.start}
          onChange={onSetClipBounds}
          label="Clip bounds"
        />
      </div>
    </section>
  );
}
