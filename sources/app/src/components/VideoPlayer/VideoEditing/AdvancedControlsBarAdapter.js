import AdvancedControlsBar from './AdvancedControlsBar';
import React, { useEffect, useState } from 'react';
import { usePlayer } from './util';

export default function AdvancedControlsBarAdapter(props) {
  const player = usePlayer(props.id);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(null);
  const [duration, setDuration] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (player()) {
      player().on('timeupdate', () => {
        setTime(player().currentTime());
      });

      player().on('loadedmetadata', () => {
        setDuration(player().duration());
      });

      ['play', 'pause'].forEach((e) => {
        player().on(e, () => {
          setIsPlaying(!player().paused());
        });
      });
    }
  }, [player]);

  const onTogglePlay = () => {
    if (player().paused()) {
      player().play();
    } else {
      player().pause();
    }
  };

  const onPause = () => {
    player().pause();
  };

  const onFullScreen = () => {
    if (!player().isFullscreen()) {
      player().requestFullscreen();
    } else {
      player().exitFullscreen();
    }
  };

  const seek = (secs) => {
    let time = player().currentTime() + secs;
    player().currentTime(time < 0 ? 0 : time);
  };

  const onSetVolume = (volume) => {
    setVolume(volume);
    player().volume(volume);
  };

  const onSetPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    player().playbackRate(speed);
  };

  const onSetTime = (time) => {
    setTime(time);
    player().currentTime(time);
  };

  return (
    <AdvancedControlsBar
      src={props.src}
      onSkipForward={() => seek(10)}
      onSkipBack={() => seek(-10)}
      isPlaying={isPlaying}
      onPause={onPause}
      onTogglePlay={onTogglePlay}
      onFullScreen={onFullScreen}
      onSetVolume={onSetVolume}
      onSetTime={onSetTime}
      volume={volume}
      onSetPlaybackSpeed={onSetPlaybackSpeed}
      playbackSpeed={playbackSpeed}
      duration={duration}
      time={time}
    />
  );
}
