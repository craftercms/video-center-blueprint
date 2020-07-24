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

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import LocationOnRounded from '@material-ui/icons/LocationOnRounded';
import { usePlayer } from './util';
import FieldSet from './FieldSet';

export function GoToVideoJSAdapter(props) {
  const { id } = props;
  const player = usePlayer(id);
  return <GoTo
    onSeek={(time) => player().currentTime(time)}
  />;
}

export function GoTo(props) {
  const { onSeek } = props;
  const [value, setValue] = useState('');
  const seek = () => !isNaN(parseFloat(value)) && onSeek(parseFloat(value));
  return (
    <FieldSet label="Seek To">
      <TextField
        size="small"
        label="Seconds"
        variant="outlined"
        value={value}
        onKeyPress={(e) => (e.key === 'Enter') && seek()}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton onClick={seek}>
        <LocationOnRounded />
      </IconButton>
    </FieldSet>
  );
}
