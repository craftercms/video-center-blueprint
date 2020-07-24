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

import React, { Fragment, useEffect, useState } from 'react';
import Root from './VideoEditing/Root';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Player from './VideoEditing/Player';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import PauseRounded from '@material-ui/icons/PauseRounded';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import ForwardRounded from '../Icons/ForwardRounded';
import ReplayRounded from '@material-ui/icons/ReplayRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import CloseRounded from '@material-ui/icons/CloseRounded';
import Typography from '@material-ui/core/Typography';
import SearchRounded from '@material-ui/icons/SearchRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { StreamListFetcherVideoJSAdapter } from './VideoEditing/StreamsList';

const getClasses = makeStyles(() => ({
  paper: {},
  content: {
    padding: '2em 1em'
  },
  popper: {}
}));

const players = new Array(6).fill('player').map((base, i) => `${base}_${i}`);

export default function () {
  const classes = getClasses();
  return (
    <Root>
      <div className={classes.content}>
        <Typography variant="h1" color="inherit">Multi View</Typography>
        <Grid>
          <Grid container spacing={3}>
            {
              players.map((id) =>
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <PlayerWithControlWheel id={id} />
                </Grid>
              )
            }
          </Grid>
        </Grid>
      </div>
    </Root>
  );
}

const getControlWheelClasses = makeStyles(() => ({
  root: {
    width: 150,
    height: 150,
    position: 'relative',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  play: {
    top: '50%',
    left: '50%',
    margin: '-21px 0 0 -21px',
    position: 'absolute',
  },
  forward: {
    top: '25px',
    left: '15px',
    position: 'absolute',
  },
  backward: {
    top: '25px',
    right: '15px',
    position: 'absolute',
  },
  fullscreen: {
    bottom: '25px',
    right: '15px',
    position: 'absolute',
  },
  volume: {
    bottom: '25px',
    left: '15px',
    position: 'absolute',
  },
  close: {
    top: '5px',
    left: '50%',
    margin: '0 0 0 -21px',
    position: 'absolute',
  },
  choose: {
    bottom: '5px',
    left: '50%',
    margin: '0 0 0 -21px',
    position: 'absolute',
  }
}));

function ControlWheel(props) {
  const { id, isPlaying = false, onActionClick } = props;
  const classes = getControlWheelClasses();
  const [open, setOpen] = useState(false);
  return (
    <section className={classes.root}>
      <IconButton aria-label="Toggle play" className={classes.play}>
        {
          isPlaying
            ? <PauseRounded />
            : <PlayArrowRounded />
        }
      </IconButton>
      <IconButton aria-label="Skip back" className={classes.backward}>
        <ReplayRounded />
      </IconButton>
      <IconButton aria-label="Skip forward" className={classes.forward}>
        <ForwardRounded />
      </IconButton>
      <IconButton aria-label="Fullscreen" className={classes.fullscreen}>
        <FullscreenRoundedIcon />
      </IconButton>
      <IconButton aria-label="Volume" className={classes.volume}>
        <VolumeUpRoundedIcon />
      </IconButton>
      <IconButton aria-label="Clear video" className={classes.close}>
        <CloseRounded />
      </IconButton>
      <IconButton
        aria-label="Choose stream"
        className={classes.choose}
        onClick={() => setOpen(true)}
      >
        <SearchRounded />
      </IconButton>
      <Dialog
        open={open}
        fullWidth
        onClose={() => setOpen(false)}
      >
        <DialogTitle disableTypography>
          <Typography color="inherit" children="Choose Stream" />
        </DialogTitle>
        <DialogContent>
          <StreamListFetcherVideoJSAdapter
            id={id}
            onStreamSelected={() => {
              setOpen(false);
              onActionClick && onActionClick('streamSelected');
            }}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}

const getPlayerWithWheelClasses = makeStyles(() => ({
  paper: {
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
}));

function PlayerWithControlWheel({ id }) {
  const classes = getPlayerWithWheelClasses();
  const [rect, setRect] = useState(null);
  const [video, setVideo] = useState();
  useEffect(() => {
    if (video) {
      const fn = () => setRect(video.getBoundingClientRect());
      video.addEventListener('mouseover', fn, false);
      return () => {
        video.removeEventListener('mouseover', fn, false);
      };
    }
  }, [video]);
  return (
    <Fragment>
      <Player
        id={id}
        ref={(result) => setVideo(result.video)}
      />
      <Popover
        hideBackdrop
        transitionDuration={0}
        open={Boolean(rect)}
        anchorEl={video}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          classes: { root: classes.paper },
          style: rect ? { width: rect.width, height: rect.height } : null,
          onMouseLeave() {
            setRect(false);
          }
        }}
      >
        <ControlWheel
          id={id}
          onActionClick={(action) => {
            if (action === 'streamSelected') {
              setRect(false)
            }
          }}
        />
      </Popover>
    </Fragment>
  );
}
