import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import VideoJSBasicPlayer from './VideoJSBasicPlayer';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Tooltip } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  content: {
    display: 'flex'
  },
  controls: {
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

export default function ClipDialog(props) {
  return (
    <Dialog
      open={props.open}
      fullWidth
      onClose={props.onClose}
      maxWidth={false}
    >
      <ClipDialogWrapper {...props} />
    </Dialog>
  );
}

function ClipDialogWrapper(props) {
  const classes = useStyles();
  const [workingBounds, setWorkingBounds] = useState({
    start: 1,
    end: 86400
  });
  const [duration, setDuration] = useState(86400);
  const { onClose, video, onCreate } = props;

  return (
    <>
      <DialogTitle>
        Clip Creator
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <section className={classes.content}>
          <VideoJSBasicPlayer video={video} setDuration={setDuration} />
          <section className={classes.controls}>
            <div className={classes.control}>
              <Typography gutterBottom>
                Video duration: 48 minutes
              </Typography>
            </div>
            <div className={classes.control}>
              <Typography gutterBottom>
                Working bounds
              </Typography>
              <Slider
                value={[1, duration]}
                step={1}
                max={duration}
                onChange={() => console.log('changes')}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                ValueLabelComponent={ValueLabelComponent}
              />
              <div className={classes.timeSelection}>
              </div>
            </div>
            <div className={classes.control}>
              <Typography gutterBottom>
                Playback Time
              </Typography>
              <Slider
                value={[0, 30]}
                onChange={() => console.log('changes')}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </div>
            <div className={classes.control}>
              <Typography gutterBottom>
                Clip bounds
              </Typography>
              <Slider
                value={[30, 50]}
                onChange={() => console.log('changes')}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </div>
          </section>
        </section>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          CANCEL
        </Button>
        <Button onClick={onCreate}>
          CREATE CLIP
        </Button>
      </DialogActions>
    </>
  );
}

function ValueLabelComponent(props) {
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
  return `${days}d ${hours}:${minutes}:${seconds}`;
};

function addZero(number) {
  return (number < 10 ? '0' : '') + number;
}
