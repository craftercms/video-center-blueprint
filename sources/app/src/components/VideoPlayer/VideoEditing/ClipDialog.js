import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import VideoJSBasicPlayer from './VideoJSBasicPlayer';
import BasicControlsAdapter from './BasicControlsAdapter';
import Grid from '@material-ui/core/Grid';
import ClipControlsAdapter from './ClipControlsAdapter';
import { usePlayer } from './util';

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
  const id = 'basicPlayer';
  const player = usePlayer(id);

  useEffect(() => {
    if (player()) {
      player().src({ type, src });
    }
  }, [player]);

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
            <VideoJSBasicPlayer
              id={id}
              video={video}
              classes={{ root: classes.root, video: classes.video }}
            />
            <BasicControlsAdapter id={id} classes={{ grow: classes.grow }} />
          </Grid>
          <Grid item xs>
            <ClipControlsAdapter
              id={id}
              classes={{ controls: classes.controls, control: classes.control }}
            />
          </Grid>
        </Grid>
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
