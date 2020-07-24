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

export function updateDimensions() {
  var playerContainer = document.getElementById('app-content__player'),
    playerAspect = document.querySelector('.global-video-player .player-container'),
    playerResize = document.querySelector('.global-video-player'),
    dimensions = {
      width: playerContainer.offsetWidth,
      height: playerContainer.offsetHeight
    },
    aspect = (playerAspect.offsetHeight * 100) / playerAspect.offsetWidth,
    maxWidth = (dimensions.height * 100) / aspect;

  playerResize.style.minWidth = '160px';
  playerResize.style.minHeight = '90px';
  playerResize.style.maxWidth = maxWidth + 'px';
  playerResize.style.maxHeight = dimensions.height + 'px';
}
