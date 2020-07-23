import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { ValueLabelComponent } from './ClipControlsAdapter';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  timeSelection: {}
}));

export default function BoundsControl(props) {
  const { start, end, max, onChange, label } = props;
  const classes = useStyles();

  return (
    <>
      <Typography gutterBottom>
        {label}
      </Typography>
      <Slider
        value={[start, end]}
        step={1}
        max={max}
        onChange={(e, value) => onChange(value)}
        valueLabelDisplay="auto"
        ValueLabelComponent={ValueLabelComponent}
      />
      <div className={classes.timeSelection}>
      </div>
    </>
  );
}
