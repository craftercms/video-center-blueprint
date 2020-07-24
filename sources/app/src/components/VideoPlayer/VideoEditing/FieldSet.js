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
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const getClasses = makeStyles((theme) => ({
  align: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px 0 0 0`,
    margin: `0 0 ${theme.spacing(2)}px 0`
  }
}));

export default function (props) {
  const { children, label, classes } = props;
  const cls = getClasses();
  return (
    <>
      <Typography color="inherit" component="h3" variant="subtitle1" children={label} />
      <div className={clsx(cls.align, classes?.content)} children={children} />
    </>
  );
}
