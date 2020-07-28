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

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { SliderValueLabel } from './SliderValueLabel';
import { TimePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import { useSlider } from './BoundsControl';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(() => ({
  timeSelection: {
    display: 'flex',
    alignContent: 'center'
  },
  link: {
    marginLeft: '20px'
  }
}));

export default function PlayBackTimeControl(props) {
  const { currentTime, max, onChange, label, onStartHere, onEndHere } = props;
  const classes = useStyles();
  const sliderClasses = useSlider();

  return (
    <>
      <Typography gutterBottom>
        {label}
      </Typography>
      <Slider
        value={currentTime}
        max={max}
        classes={sliderClasses}
        onChange={(e, time) => onChange(time)}
        valueLabelDisplay="auto"
        ValueLabelComponent={SliderValueLabel}
      />
      <div className={classes.timeSelection}>
        <TimePicker
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          format="HH:mm:ss"
          onChange={(e, value) => console.log(e, value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton>
                <ScheduleRoundedIcon />
              </IconButton>
            </InputAdornment>,
          }}
        />
        <Link
          component="button"
          variant="body2"
          color="textPrimary"
          underline="always"
          className={classes.link}
          onClick={() => onStartHere(currentTime)}
        >
          Start Here
        </Link>
        <Link
          component="button"
          variant="body2"
          color="textPrimary"
          underline="always"
          className={classes.link}
          onClick={() => onEndHere(currentTime)}
        >
          End Here
        </Link>
      </div>
    </>
  );
}
