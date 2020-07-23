import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { ValueLabelComponent } from './ClipControlsAdapter';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  timeSelection: {}
}));

export default function PlayBackTimeControl(props) {
  const { currentTime, max, onChange, label } = props;
  const classes = useStyles();

  return (
    <>
      <Typography gutterBottom>
        {label}
      </Typography>
      <Slider
        value={currentTime}
        max={max}
        onChange={(e, time) => onChange(time)}
        valueLabelDisplay="auto"
        ValueLabelComponent={ValueLabelComponent}
      />
      <div className={classes.timeSelection}>
      </div>
    </>
  );
}
