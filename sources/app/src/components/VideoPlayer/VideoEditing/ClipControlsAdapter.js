import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Tooltip } from '@material-ui/core';
import moment from 'moment';
import VideoDurationControl from './VideoDurationControl';
import videojs from 'video.js';
import BoundsControl from './BoundsControl';
import PlayBackTimeControl from './playBackTimeControl';

const useStyles = makeStyles((theme) => ({
  controls: {
    minWidth: '600px',
    flexGrow: 1,
    paddingLeft: '24px'
  },
  control: {
    width: '100%',
    marginBottom: '25px'
  }
}));

const valueLabelStyles = makeStyles(() => ({
  tooltip: {
    padding: 4
  },
  img: {
    width: 200,
    height: 150,
    objectFit: 'fill'
  },
  label: {
    textAlign: 'center'
  }
}));

export default function ClipControlsAdapter(props) {
  const classes = useStyles();
  const player = videojs.getPlayer(props.id);
  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [workingBounds, setWorkingBounds] = useState({
    start: null,
    end: null
  });
  const [clipBounds, setClipBounds] = useState({
    start: null,
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
    <section className={classes.controls}>
      <div className={classes.control}>
        <VideoDurationControl duration={formatSeconds(duration)} />
      </div>
      <div className={classes.control}>
        <BoundsControl
          start={workingBounds.start}
          end={workingBounds.end ?? duration}
          max={duration}
          onChange={onSetWorkingBounds}
          label="Working bounds"
        />
      </div>
      <div className={classes.control}>
        <PlayBackTimeControl
          currentTime={currentTime}
          max={duration}
          onChange={onSetTime}
          label="Playback Time"
        />
      </div>
      <div className={classes.control}>
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


export function ValueLabelComponent(props) {
  const { children, open, value } = props;
  const classes = valueLabelStyles();

  return (
    <Tooltip
      placement="top"
      open={open}
      classes={{ tooltip: classes.tooltip }}
      title={
        <>
          <Typography className={classes.label}>{formatSeconds(value)}</Typography>
        </>
      }
    >
      {children}
    </Tooltip>
  );
}

const formatSeconds = (value) => {
  let duration = moment.duration(value, 'seconds');
  let days = duration.days();
  let hours = addZero(duration.hours());
  let minutes = addZero(duration.minutes());
  let seconds = addZero(duration.seconds());
  return days ? `${days}d ${hours}:${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
};

function addZero(number) {
  return (number < 10 ? '0' : '') + number;
}
