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
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import StopRounded from '@material-ui/icons/StopRounded';
import LoopRounded from '@material-ui/icons/LoopRounded';
import AddLocationRounded from '@material-ui/icons/AddLocationRounded';
import ContentCutRounded from '../../Icons/ContentCutRounded';
import FieldSet from './FieldSet';

export function LooperVideoJSAdapter(props) {
  const { id } = props;
  const player = usePlayer(id);
  const [looping, setLooping] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const ref = useRef();
  return <Looper
    start={start}
    end={end}
    isLooping={looping}
    onSetStart={(value) => {
      setStart(value);
    }}
    onSetEnd={(value) => {
      setEnd(value);
    }}
    onMarkStart={() => {
      setStart(`${parseInt(player().currentTime())}`);
    }}
    onMarkEnd={() => {
      setEnd(`${parseInt(player().currentTime())}`);
    }}
    onToggleLoop={(start, end) => {
      const p = player();
      if (looping) {
        p.off('timeupdate', ref.current);
        setLooping(false);
        setStart('');
        setEnd('');
        ref.current = null;
      } else {
        setLooping(true);
        p.on('timeupdate', ref.current = () => {
          const time = p.currentTime();
          if (time < start || time >= end) {
            p.currentTime(start);
          }
        });
        p.currentTime(start);
        p.play();
      }
    }}
  />;
}

const getLooperClasses = makeStyles(() => ({
  align: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: 80
  },
  spacer: {
    margin: '0 .75em'
  }
}));

export function Looper(props) {
  const { start, end, onSetStart, onSetEnd, onMarkStart, onMarkEnd, onToggleLoop, isLooping } = props;
  const hasStartAndEnd = start !== '' && end !== '';
  const classes = getLooperClasses();
  const handleClick = (e) => {
    if (isLooping) {
      onToggleLoop(null, null);
    } else if (hasStartAndEnd) {
      onToggleLoop(parseFloat(start), parseFloat(end));
    } else if (start === '') {
      onMarkStart(e.target.value);
    } else if (end === '') {
      onMarkEnd(e.target.value);
    }
  };
  return (
    <FieldSet label="Loop">
      <TextField
        className={classes.input}
        size="small"
        label="Start"
        variant="outlined"
        value={start}
        disabled={isLooping}
        onChange={(e) => {
          onSetStart(e.target.value);
        }}
      />
      <span className={classes.spacer}>-</span>
      <TextField
        className={classes.input}
        size="small"
        label="End"
        variant="outlined"
        value={end}
        disabled={isLooping}
        onChange={(e) => {
          onSetEnd(e.target.value);
        }}
      />
      <IconButton onClick={handleClick}>
        {isLooping ? <StopRounded /> : hasStartAndEnd ? <LoopRounded /> : <AddLocationRounded />}
      </IconButton>
      <IconButton hidden={!hasStartAndEnd} aria-label="Create Clip">
        <ContentCutRounded />
      </IconButton>
    </FieldSet>
  );
}
