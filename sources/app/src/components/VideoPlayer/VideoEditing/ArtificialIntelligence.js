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
// import { makeStyles } from '@material-ui/core/styles';
import Transcript from './Transcript';

// const getClasses = makeStyles(() => ({}));

const ITEMS = [
  { time: 0, copy: 'Truck identified' },
  { time: 0, copy: 'Car recognized' },
  { time: 0, copy: 'Person detected' },
  { time: 0, copy: 'Possible drone' },
  { time: 0, copy: 'Gun detected' },
  { time: 0, copy: 'Aircraft recognized' }
];

export default function (props) {
  const { items = ITEMS } = props;
  // const cls = getClasses();
  return (
    <>
      <Transcript items={items} />
    </>
  );
}
