import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function VideoDurationControl(props) {
  return (
    <Typography gutterBottom>
      Video duration: {props.duration}
    </Typography>
  );
}
