import React, { useEffect, useState } from 'react';
import videojs from 'video.js';
import BasicControls from './BasicControls';

export default function BasicControlsAdapter(props) {
  const player = videojs.getPlayer(props.id);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (player) {
      ['play', 'pause'].forEach((e) => {
        player.on(e, () => {
          setIsPlaying(!player.paused());
        });
      });
    }
  }, [player]);

  const onTogglePlay = () => {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  };

  const onFullScreen = () => {
    if (!player.isFullscreen()) {
      player.requestFullscreen();
    } else {
      player.exitFullscreen();
    }
  };

  const seek = (secs) => {
    let time = player.currentTime() + secs;
    player.currentTime(time < 0 ? 0 : time);
  };

  const onSetVolume = (volume) => {
    setVolume(volume);
    player.volume(volume);
  };

  return (
    <BasicControls
      classes={props.classes}
      onSkipBack={() => seek(-10)}
      onTogglePlay={onTogglePlay}
      isPlaying={isPlaying}
      onSkipForward={() => seek(10)}
      onFullScreen={onFullScreen}
      volume={volume}
      onSetVolume={onSetVolume}
    />
  );
}
