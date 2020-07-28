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

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Player from './Player';
import BasicControlsAdapter from './BasicControlsAdapter';
import Grid from '@material-ui/core/Grid';
import ClippingControlsVideoJSAdapter from './ClippingControls';
import { usePlayer, useVideoJSVolume } from './util';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  grow: {
    marginTop: '10px'
  },
  root: {
    width: '580px',
  },
  video: {
    width: '580px',
    height: '380px',
    maxWidth: '100%'
  },
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

export default function ClipDialog(props) {
  return (
    <Dialog
      open={props.open}
      fullWidth
      onClose={props.onClose}
      maxWidth={'lg'}
    >
      <ClipDialogWrapper {...props} />
    </Dialog>
  );
}

function ClipDialogWrapper(props) {
  const classes = useStyles();
  const { onClose, video, onCreate } = props;
  const { type, src } = props.src;
  const id = 'clipperPlayer';
  const getPlayer = usePlayer(id);
  const [volume] = useVideoJSVolume(id);

  useEffect(() => {
    const player = getPlayer();
    if (player && src) {
      player.src({ type, src });
    }
  }, [getPlayer, type, src]);

  return (
    <>
      <DialogTitle>
        Clip Creator
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs>
            <Player
              id={id}
              options={{
                volume,
                muted: volume === 0
              }}
              video={video}
              classes={{ root: classes.root, video: classes.video }}
            />
            <BasicControlsAdapter id={id} classes={{ grow: classes.grow }} />
          </Grid>
          <Grid item xs>
            <ClippingControlsVideoJSAdapter
              id={id}
              classes={{ controls: classes.controls, control: classes.control }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onCreate}>
          Create Clip
        </Button>
      </DialogActions>
    </>
  );
}
