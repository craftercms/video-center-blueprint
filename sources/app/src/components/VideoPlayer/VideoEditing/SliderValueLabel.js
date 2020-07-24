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

import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { formatSeconds } from './util';

const valueLabelStyles = makeStyles(() => ({
  tooltip: {
    padding: 4
  },
  img: {
    width: 200,
    height: 150,
    objectFit: 'fill'
  },
  label: {
    textAlign: 'center'
  }
}));

export function SliderValueLabel(props) {
  const { children, open, value } = props;
  const classes = valueLabelStyles();

  return (
    <Tooltip
      placement="top"
      open={open}
      classes={{ tooltip: classes.tooltip }}
      title={
        <>
          <img className={classes.img} src="https://placekitten.com/g/200/150" alt="" />
          <Typography className={classes.label}>{formatSeconds(value)}</Typography>
        </>
      }
    >
      {children}
    </Tooltip>
  );
}
