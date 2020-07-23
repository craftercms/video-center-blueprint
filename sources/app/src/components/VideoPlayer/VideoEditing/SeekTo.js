import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import LocationOnRounded from '@material-ui/icons/LocationOnRounded';
import { usePlayer } from './util';
import { makeStyles } from '@material-ui/core/styles';

const getGoToClasses = makeStyles(() => ({
  align: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export function GoToVideoJSAdapter(props) {
  const { id } = props;
  const player = usePlayer(id);
  return <GoTo
    onSeek={(time) => {
      player().currentTime(time);
    }}
  />;
}

function GoTo(props) {
  const { onSeek } = props;
  const [value, setValue] = useState('');
  const seek = () => {
    onSeek(parseFloat(value));
  };
  const classes = getGoToClasses();
  return (
    <>
      <Typography variant="subtitle1" color="inherit">Go To</Typography>
      <div className={classes.align}>
        <TextField
          size="small"
          label="Seconds"
          variant="outlined"
          value={value}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              seek();
            }
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <IconButton onClick={seek}>
          <LocationOnRounded />
        </IconButton>
      </div>
    </>
  );
}
