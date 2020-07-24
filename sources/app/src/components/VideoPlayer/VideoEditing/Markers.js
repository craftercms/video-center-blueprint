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
import Transcript from './Transcript';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const getClasses = makeStyles(() => ({
  slider: {}
}));

export default function (props) {
  // const {  } = props;
  const classes = getClasses();
  return (
    <>
      <Slider
        track={false}
        defaultValue={[20, 37, 50, 70, 80, 95]}
        valueLabelDisplay="auto"
        className={classes.slider}
      />
      <Transcript />
    </>
  );
}
