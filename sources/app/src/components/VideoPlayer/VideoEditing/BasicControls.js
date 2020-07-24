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

import IconButton from '@material-ui/core/IconButton';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import Fab from '@material-ui/core/Fab';
import ReplayRounded from '@material-ui/icons/ReplayRounded';
import PauseRounded from '@material-ui/icons/PauseRounded';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import ForwardRounded from '../../Icons/ForwardRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  fabButtons: {
    width: 260,
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fabButton: {},
  volumeMenu: {
    height: 130,
    overflow: 'hidden'
  },
  volumeMenuList: {
    padding: '15px 0 0 0'
  },
  volumeSlider: {
    height: '100px !important'
  },
}));

export default function BasicControls(props) {
  const {
    onSkipBack,
    onTogglePlay,
    isPlaying,
    onSkipForward,
    onFullScreen,
    volume,
    onSetVolume
  } = props;

  const classes = useStyles();
  const [volumeMenu, setVolumeMenu] = useState(null);
  const closeVolumeMenu = () => setVolumeMenu(null);

  return (
    <>
      <section className={clsx(classes.grow, props.classes?.grow)}>
        <div className={clsx(classes.fabButtons, props.classes?.fabButtons)}>
          <IconButton aria-label="" onClick={(e) => setVolumeMenu(e.currentTarget)}>
            <VolumeUpRoundedIcon />
          </IconButton>
          <Fab
            color="primary"
            aria-label=""
            size="small"
            className={clsx(classes.fabButton, props.classes?.fabButton)}
            onClick={onSkipBack}
          >
            <ReplayRounded />
          </Fab>
          <Fab
            color="primary"
            aria-label=""
            size="medium"
            className={clsx(classes.fabButton, props.classes?.fabButton)}
            onClick={onTogglePlay}
          >
            {
              isPlaying
                ? <PauseRounded />
                : <PlayArrowRounded />
            }
          </Fab>
          <Fab
            color="primary"
            aria-label=""
            size="small"
            className={clsx(classes.fabButton, props.classes?.fabButton)}
            onClick={onSkipForward}
          >
            <ForwardRounded />
          </Fab>
          <IconButton aria-label="" onClick={onFullScreen}>
            <FullscreenRoundedIcon />
          </IconButton>
        </div>
      </section>
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
          step={0.1}
          max={1}
          onChange={(e, volume) => onSetVolume(volume)}
        />
      </Menu>
    </>
  );
}
