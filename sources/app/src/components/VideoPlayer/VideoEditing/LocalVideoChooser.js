import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { usePlayer } from './util';

function LocalVideoChooser(props) {
  const { onChange } = props;
  return (
    <>
      <InputLabel htmlFor="localVideoSelector">Local Video</InputLabel>
      <input id="localVideoSelector" type="file" onChange={onChange} />
      <FormHelperText>Select a video from your computer</FormHelperText>
    </>
  );
}

export function LocalVideoChooserVideoJSAdapter(props) {
  const { id } = props;
  const player = usePlayer(id);
  const onChange = (e) => {
    const file = e.target.files[0];
    const type = file.type;
    const fileURL = URL.createObjectURL(file);
    player().src({ type, src: fileURL });
  };
  return (
    <LocalVideoChooser onChange={onChange} />
  );
}
