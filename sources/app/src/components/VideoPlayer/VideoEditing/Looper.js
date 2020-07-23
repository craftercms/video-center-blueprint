import { usePlayer } from './util';
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import StopRounded from '@material-ui/icons/StopRounded';
import LoopRounded from '@material-ui/icons/LoopRounded';
import AddLocationRounded from '@material-ui/icons/AddLocationRounded';
import ContentCutRounded from '../../Icons/ContentCutRounded';

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

function Looper(props) {
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
    <>
      <Typography variant="subtitle1" color="inherit">Loop</Typography>
      <div className={classes.align}>
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
      </div>
    </>
  );
}
