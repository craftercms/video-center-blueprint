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

const useStyles = makeStyles(() => ({
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
        ValueLabelComponent={SliderValueLabel}
      />
      <div className={classes.timeSelection}>
      </div>
    </>
  );
}
