import React, { useMemo, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
//import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import PlayArrowRounded from '@material-ui/icons/Settings';
import PauseRounded from '@material-ui/icons/PauseRounded';
import MoreVertRounded from '@material-ui/icons/MoreVertRounded';
import SearchRounded from '@material-ui/icons/SearchRounded';
import Fab from '@material-ui/core/Fab';
import Slider from '@material-ui/core/Slider';
import Replay10Rounded from '@material-ui/icons/Replay10Rounded';
import Forward10Rounded from '@material-ui/icons/Forward10Rounded';
import ContentCutRounded from '../Icons/ContentCutRounded';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import SpeedRoundedIcon from '@material-ui/icons/SpeedRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButtons: {
    width: 150,
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fabButton: {},
  slider: {
    left: 0,
    top: '-13px',
    position: 'absolute'
  },
  volumeMenu: {
    height: 122
  },
  volumeMenuList: {
    padding: '10px 0 0 0'
  },
  volumeSlider: {
    height: '100px !important'
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
    onSeekTo,
    onClip,
    onScreenCapture,
    onRecord,
    onSetVolume,
    onSetPlaybackSpeed,
    isRecording = 1,
    isPlaying,
    isClipping,
    volume = 60,
    playbackSpeed = 1,
    playbackSpeeds = SPEEDS,
    time = 60
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
  const [volumeMenu, setVolumeMenu] = useState(null);
  const closePlaybackSpeedMenu = () => setPlaybackSpeedMenu(null);
  const closeVolumeMenu = () => setVolumeMenu(null);
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="default" position={position} className={classes.appBar}>
        <Toolbar>
          <Slider
            min={0}
            step={1}
            max={100}
            value={time}
            valueLabelDisplay="auto"
            ValueLabelComponent={ValueLabelComponent}
            className={classes.slider}
          />
          <IconButton aria-label="">
            <PhotoCameraRoundedIcon />
          </IconButton>
          <IconButton aria-label="" className={isRecording ? classes.recordingActive : null}>
            <FiberManualRecordRoundedIcon />
          </IconButton>
          <IconButton aria-label="">
            <ContentCutRounded />
          </IconButton>
          <section className={classes.grow}>
            <div className={classes.fabButtons}>
              <Fab color="primary" aria-label="" size="small" className={classes.fabButton}>
                <Replay10Rounded />
              </Fab>
              <Fab color="primary" aria-label="" size="medium" className={classes.fabButton}>
                {isPlaying ? <PauseRounded /> : <PlayArrowRounded />}
              </Fab>
              <Fab color="primary" aria-label="" size="small" className={classes.fabButton}>
                <Forward10Rounded />
              </Fab>
            </div>
          </section>
          <IconButton aria-label="" onClick={(e) => setVolumeMenu(e.currentTarget)}>
            <VolumeUpRoundedIcon />
          </IconButton>
          <IconButton aria-label="" onClick={(e) => setPlaybackSpeedMenu(e.currentTarget)}>
            <SpeedRoundedIcon />
          </IconButton>
          <IconButton aria-label="">
            <SearchRounded />
          </IconButton>
          <IconButton aria-label="">
            <ChatRoundedIcon />
          </IconButton>
          <IconButton aria-label="">
            <MoreVertRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={playbackSpeedMenu}
        open={Boolean(playbackSpeedMenu)}
        onClose={closePlaybackSpeedMenu}
      >
        {playbackSpeeds.map(speed =>
          <MenuItem
            key={speed.value}
            onClick={closePlaybackSpeedMenu}
            children={speed.label}
          />
        )}
      </Menu>
      <Menu
        anchorEl={volumeMenu}
        open={Boolean(volumeMenu)}
        onClose={closeVolumeMenu}
        classes={{ paper: classes.volumeMenu, list: classes.volumeMenuList }}
      >
        <Slider
          className={classes.volumeSlider}
          orientation="vertical"
          value={volume}
          min={0}
          step={1}
          max={100}
        />
      </Menu>
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
          <img className={classes.img} src="https://placekitten.com/g/200/150" alt="" />
          <Typography className={classes.label}>{value}</Typography>
        </>
      }
    >
      {children}
    </Tooltip>
  );
}
