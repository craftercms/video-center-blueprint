import React, { useMemo, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertRounded from '@material-ui/icons/MoreVertRounded';
import SearchRounded from '@material-ui/icons/SearchRounded';
import Slider from '@material-ui/core/Slider';
import ContentCutRounded from '../../Icons/ContentCutRounded';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import SpeedRoundedIcon from '@material-ui/icons/SpeedRounded';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import videojs from 'video.js';
import ClipDialog from './ClipDialog';
import BasicControls from './BasicControls';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  slider: {
    left: 0,
    top: '-13px',
    position: 'absolute'
  },
  recordingActive: {
    color: 'red'
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

const SPEEDS = [
  { value: .5, label: '0.5x' },
  { value: 1, label: '1.0x' },
  { value: 1.5, label: '1.5x' },
  { value: 2, label: '2.0x' }
];

export default function (props) {
  const {
    position = 'fixed',
    onTogglePlay,
    onSkipForward,
    onSkipBack,
    onFullScreen,
    onSeekTo,
    onScreenCapture,
    onRecord,
    onSetVolume,
    onSetTime,
    onSetPlaybackSpeed,
    onBackToSimpleMenu,
    isRecording = 1,
    isPlaying,
    isClipping,
    volume = 60,
    playbackSpeed = 1,
    playbackSpeeds = SPEEDS,
    time = 60,
    duration,
    video
  } = props;
  const classes = useStyles();
  const theme = useMemo(() => createMuiTheme({
    typography: { fontSize: 18 },
    palette: {
      type: 'dark',
      primary: {
        main: '#f00',
        contrastText: '#FFFFFF'
      }
    }
  }), []);
  const [playbackSpeedMenu, setPlaybackSpeedMenu] = useState(null);
  const [settingsMenu, setSettingsMenu] = useState(null);
  const closePlaybackSpeedMenu = () => setPlaybackSpeedMenu(null);
  const closeSettingsMenu = () => setSettingsMenu(null);
  const [openClipDialog, setOpenClipDialog] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="default" position={position} className={classes.appBar}>
        <Toolbar>
          <Slider
            min={0}
            step={1}
            max={duration}
            value={time}
            valueLabelDisplay="auto"
            ValueLabelComponent={ValueLabelComponent}
            className={classes.slider}
            onChange={(e, time) => onSetTime(time)}
          />
          <IconButton aria-label="">
            <PhotoCameraRoundedIcon />
          </IconButton>
          <IconButton aria-label="" className={isRecording ? classes.recordingActive : null}>
            <FiberManualRecordRoundedIcon />
          </IconButton>
          <IconButton aria-label="" onClick={() => setOpenClipDialog(true)}>
            <ContentCutRounded />
          </IconButton>
          <IconButton aria-label="">
            <LocalOfferOutlinedIcon />
          </IconButton>
          <BasicControls
            onSkipBack={onSkipBack}
            onTogglePlay={onTogglePlay}
            isPlaying={isPlaying}
            onSkipForward={onSkipForward}
            onFullScreen={onFullScreen}
            volume={volume}
            onSetVolume={onSetVolume}
          />
          <IconButton aria-label="" onClick={(e) => setPlaybackSpeedMenu(e.currentTarget)}>
            <SpeedRoundedIcon />
          </IconButton>
          <IconButton aria-label="">
            <SearchRounded />
          </IconButton>
          <IconButton aria-label="">
            <ChatRoundedIcon />
          </IconButton>
          <IconButton aria-label="" onClick={(e) => setSettingsMenu(e.currentTarget)}>
            <MoreVertRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={settingsMenu}
        open={Boolean(settingsMenu)}
        onClose={closeSettingsMenu}
      >
        <MenuItem
          onClick={() => {
            onBackToSimpleMenu();
            closeSettingsMenu();
          }}
        >
          Back to simple menu
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={playbackSpeedMenu}
        open={Boolean(playbackSpeedMenu)}
        onClose={closePlaybackSpeedMenu}
      >
        {playbackSpeeds.map(speed =>
          <MenuItem
            key={speed.value}
            selected={speed.value === playbackSpeed}
            onClick={() => {
              onSetPlaybackSpeed(speed.value);
              closePlaybackSpeedMenu();
            }}
            children={speed.label}
          />
        )}
      </Menu>
      <ClipDialog
        open={true}
        onClose={() => setOpenClipDialog(false)}
        video={video}
      />
    </ThemeProvider>
  );
}

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  const classes = valueLabelStyles();
  return (
    <Tooltip
      open={open}
      classes={{ tooltip: classes.tooltip }}
      title={
        <>
          <Typography className={classes.label}>{videojs.formatTime(value)}</Typography>
        </>
      }
    >
      {children}
    </Tooltip>
  );
}


