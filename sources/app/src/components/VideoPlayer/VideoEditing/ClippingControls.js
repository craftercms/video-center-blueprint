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
import BoundsControl from './BoundsControl';
import PlayBackTimeControl from './PlayBackTimeControl';
import { formatSeconds, usePlayer } from './util';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import FiberSmartRecordIcon from '@material-ui/icons/FiberSmartRecord';

export default function ClippingControlsVideoJSAdapter(props) {
  const player = usePlayer(props.id);
  const [duration, setDuration] = useState(null);
  const [isLive, setIsLive] = useState(false);
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
    if (player()) {

      player().on('loadedmetadata', () => {
        const _duration = player().duration();
        if (_duration === Infinity) {
          setIsLive(true);
        }
        setDuration(player().duration());
      });

      player().on('play', () => {
        setDuration(player().duration());
      });

      player().on('timeupdate', () => {
        setCurrentTime(player().currentTime());
      });
    }
  }, [player]);

  const onSetTime = (time) => {
    setCurrentTime(time);
    player().currentTime(time);
  };

  const onStartHere = (time) => {
    console.log(time);
  };

  const onEndHere = (time) => {
    console.log(time);
  };

  const onSetWorkingBounds = (value) => {
    setWorkingBounds({ start: value[0], end: value[1] });
  };

  const onSetClipBounds = (value) => {
    setClipBounds({ start: value[0], end: value[1] });
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <section className={props.classes?.controls}>
        <div className={props.classes?.control}>
          <VideoDurationControl
            duration={isLive ? <span
              className={props.classes?.live}
            >Live <FiberSmartRecordIcon /></span> : formatSeconds(duration)}
          />
        </div>
        <div className={props.classes?.control}>
          <BoundsControl
            disabled={isLive}
            start={workingBounds.start}
            end={workingBounds.end ?? duration}
            max={duration}
            onChange={onSetWorkingBounds}
            label="Working bounds"
          />
        </div>
        <div className={props.classes?.control}>
          <PlayBackTimeControl
            disabled={isLive}
            currentTime={currentTime}
            max={isLive ? currentTime : duration}
            onChange={onSetTime}
            onStartHere={onStartHere}
            onEndHere={onEndHere}
            label="Playback Time"
          />
        </div>
        <div className={props.classes?.control}>
          <BoundsControl
            disabled={isLive}
            start={clipBounds.start}
            end={clipBounds.end ?? duration}
            max={(workingBounds.end ?? duration) - workingBounds.start}
            onChange={onSetClipBounds}
            label="Clip bounds"
          />
        </div>
      </section>
    </MuiPickersUtilsProvider>
  );
}
