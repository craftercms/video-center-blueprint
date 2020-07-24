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

import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { usePlayer } from './util';
import FieldSet from './FieldSet';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const getClasses = makeStyles(() => ({
  content: {
    justifyContent: 'space-between'
  }
}));

function LocalVideoChooser(props) {
  const { onChange } = props;
  const classes = getClasses();
  return (
    <FieldSet label="Local Video" classes={{ content: classes.content }}>
      <Button
        color="secondary"
        variant="contained"
        component="label"
        htmlFor="localVideoSelector"
      >
        Choose Video
        <input
          type="file"
          id="localVideoSelector"
          onChange={onChange}
          style={{ display: 'none' }}
        />
      </Button>
      <FormHelperText>Select a video from your computer</FormHelperText>
    </FieldSet>
  );
}

export function LocalVideoChooserVideoJSAdapter(props) {
  const { id } = props;
  const player = usePlayer(id);
  const onChange = (e) => {
    const file = e.target.files[0];
    const type = file.type;
    const fileURL = URL.createObjectURL(file);
    props.onChange({ type, src: fileURL });
    player().src({ type, src: fileURL });
  };
  return (
    <LocalVideoChooser onChange={onChange} />
  );
}
