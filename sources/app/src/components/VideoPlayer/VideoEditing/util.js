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

import { useCallback, useEffect, useState } from 'react';
import videojs from 'video.js';
import moment from 'moment';

export function usePlayer(id) {
  return useCallback(() => videojs.getPlayer(id), [id]);
}

export const formatSeconds = (value) => {
  let duration = moment.duration(value, 'seconds');
  let days = duration.days();
  let hours = addZero(duration.hours());
  let minutes = addZero(duration.minutes());
  let seconds = addZero(duration.seconds());
  return days ? `${days}d ${hours}:${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
};

function addZero(number) {
  return (number < 10 ? '0' : '') + number;
}

export function useVideoJSIsFullScreen(id) {
  const getPlayer = usePlayer(id);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const setter = useCallback((value) => getPlayer().isFullscreen(value), [getPlayer]);
  useEffect(() => {
    const player = getPlayer();
    const onChange = () => setIsFullScreen(player.isFullscreen());
    player.on('fullscreenchange', onChange);
    return () => player.off('fullscreenchange', onChange);
  }, [getPlayer]);
  useEffect(() => {
    const player = getPlayer();
    const playerIsFullScreen = player.isFullscreen();
    (playerIsFullScreen !== isFullScreen) && setIsFullScreen(playerIsFullScreen);
  }, [getPlayer, isFullScreen]);
  return [isFullScreen, setter];
}

export function useVideoJSVolume(id) {
  const getPlayer = usePlayer(id);
  const [volume, setVolume] = useState(0);
  const setter = useCallback((value) => getPlayer().volume(value), [getPlayer]);
  useEffect(() => {
    const player = getPlayer();
    const _volume = player.volume();
    if (_volume !== volume) {
      setVolume(_volume);
    }
    const onChange = () => setVolume(player.volume());
    player.on('volumechange', onChange);
    return () => player.off('volumechange', onChange);
  }, [getPlayer, volume]);
  return [volume, setter];
}

export function useVideoJSMuted(id) {
  const getPlayer = usePlayer(id);
  const [muted, setMuted] = useState(true);
  const setter = useCallback((value) => {
    setMuted(value);
    getPlayer().volume(value);
  }, [getPlayer]);
  useEffect(() => {
    setMuted(getPlayer.muted());
  }, [getPlayer]);
  return [muted, setter];
}

export function useVideoJSControlsOnFullScreen(id) {
  const getPlayer = usePlayer(id);
  const [isFullScreen, setFullScreen] = useVideoJSIsFullScreen(id);
  useEffect(() => {
    const player = getPlayer();
    player.controls(isFullScreen);
    return () => player.controls(false);
  }, [isFullScreen, getPlayer]);
  return [isFullScreen, setFullScreen];
}
