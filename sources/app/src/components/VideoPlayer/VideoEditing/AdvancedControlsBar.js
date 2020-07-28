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
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import BasicControls from './BasicControls';
import { SliderValueLabel } from './SliderValueLabel';
import { usePlayer } from './util';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(() => ({
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
  },
  selectedMenuItem: {
    fontWeight: 'bold'
  }
}));

const SPEEDS = [
  { value: 2, label: '2.0x' },
  { value: 1.5, label: '1.5x' },
  { value: 1, label: '1.0x' },
  { value: .5, label: '0.5x' }
];

export function AdvancedControlsBar(props) {
  const {
    position = 'fixed',
    onTogglePlay,
    onSkipForward,
    onSkipBack,
    onFullScreen,
    onSeekTo,
    onScreenCapture,
    onRecord,
    onClip,
    onPause,
    onSetVolume,
    onSetPlaybackSpeed,
    onBackToSimpleMenu,
    isRecording = false,
    isPlaying,
    isClipping = false,
    volume = 60,
    playbackSpeed = SPEEDS[2],
    playbackSpeeds = SPEEDS,
    time = 60,
    duration
  } = props;
  const classes = useStyles();
  const [playbackSpeedMenu, setPlaybackSpeedMenu] = useState(null);
  const [settingsMenu, setSettingsMenu] = useState(null);
  const closePlaybackSpeedMenu = () => setPlaybackSpeedMenu(null);
  const closeSettingsMenu = () => setSettingsMenu(null);

  return (
    <>
      <AppBar color="default" position={position} className={classes.appBar}>
        <Toolbar>
          <Slider
            min={0}
            step={1}
            max={duration}
            value={time}
            valueLabelDisplay="auto"
            ValueLabelComponent={SliderValueLabel}
            className={classes.slider}
            onChange={(e, time) => onSeekTo(time)}
          />
          <IconButton aria-label="Screenshot" onClick={onScreenCapture}>
            <PhotoCameraRoundedIcon />
          </IconButton>
          <IconButton
            aria-label="Record"
            className={isRecording ? classes.recordingActive : null}
            onClick={onRecord}
          >
            <FiberManualRecordRoundedIcon />
          </IconButton>
          <IconButton
            disabled={isClipping}
            aria-label="Clip"
            onClick={() => {
              onPause();
              onClip(true);
            }}
          >
            <ContentCutRounded />
          </IconButton>
          <IconButton aria-label="Tags">
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
          <IconButton
            aria-label="Set playback rate"
            onClick={(e) => setPlaybackSpeedMenu(e.currentTarget)}
          >
            <SpeedRoundedIcon />
          </IconButton>
          <IconButton aria-label="Search">
            <SearchRounded />
          </IconButton>
          <IconButton aria-label="Text">
            <ChatRoundedIcon />
          </IconButton>
          <IconButton aria-label="Options" onClick={(e) => setSettingsMenu(e.currentTarget)}>
            <MoreVertRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={settingsMenu}
        open={Boolean(settingsMenu)}
        onClose={closeSettingsMenu}
      >
        <MenuItem>
          Settings
        </MenuItem>
        {
          onBackToSimpleMenu &&
          <MenuItem
            onClick={() => {
              onBackToSimpleMenu();
              closeSettingsMenu();
            }}
          >
            Back to simple menu
          </MenuItem>
        }
      </Menu>
      <Menu
        anchorEl={playbackSpeedMenu}
        open={Boolean(playbackSpeedMenu)}
        onClose={closePlaybackSpeedMenu}
      >
        {playbackSpeeds.map(speed =>
          <MenuItem
            key={speed.value}
            className={speed.value === playbackSpeed ? classes.selectedMenuItem : null}
            selected={speed.value === playbackSpeed}
            onClick={() => {
              onSetPlaybackSpeed(speed.value);
              closePlaybackSpeedMenu();
            }}
            children={speed.label}
          />
        )}
      </Menu>
    </>
  );
}

export function AdvancedControlsBarAdapter(props) {
  const { skip, volume, setVolume, onClip } = props;
  const player = usePlayer(props.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [duration, setDuration] = useState(null);
  const [time, setTime] = useState(null);
  const [recording, setRecording] = useState(false);
  const [snack, setSnack] = useState(false);

  useEffect(() => {
    if (player()) {
      player().on('timeupdate', () => {
        setTime(player().currentTime());
      });

      player().on('loadedmetadata', () => {
        setDuration(player().duration());
      });

      ['play', 'pause'].forEach((e) => {
        player().on(e, () => {
          setIsPlaying(!player().paused());
        });
      });
    }
  }, [player]);

  const onTogglePlay = () => {
    if (player().paused()) {
      player().play();
    } else {
      player().pause();
    }
  };

  const onPause = () => {
    player().pause();
  };

  const onFullScreen = () => {
    if (!player().isFullscreen()) {
      player().requestFullscreen();
    } else {
      player().exitFullscreen();
    }
  };

  const seek = (secs) => {
    let time = player().currentTime() + parseFloat(secs);
    player().currentTime(time < 0 ? 0 : time);
  };

  const onSetVolume = (volume) => {
    setVolume(volume);
    player().muted(false);
    player().volume(volume);
  };

  const onSetPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    player().playbackRate(speed);
  };

  const onSetTime = (time) => {
    setTime(time);
    player().currentTime(time);
  };

  return (
    <>
      <AdvancedControlsBar
        src={props.src}
        onSkipForward={() => seek(skip)}
        onSkipBack={() => seek(-skip)}
        isPlaying={isPlaying}
        onPause={onPause}
        onTogglePlay={onTogglePlay}
        onFullScreen={onFullScreen}
        onSetVolume={onSetVolume}
        onSeekTo={onSetTime}
        onClip={onClip}
        volume={volume}
        onSetPlaybackSpeed={onSetPlaybackSpeed}
        playbackSpeed={playbackSpeed}
        duration={duration}
        time={time}
        isRecording={recording}
        onRecord={() => {
          setRecording(!recording);
          if (recording) {
            setSnack(true);
          }
        }}
      />
      <Snackbar
        open={snack}
        autoHideDuration={3000}
        onClose={() => setSnack(false)}
        message="Clip created successfully."
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </>
  );
}

export default AdvancedControlsBar;
