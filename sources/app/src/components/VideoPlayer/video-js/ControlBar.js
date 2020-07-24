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

/**
 * @file control-bar.js
 */
import videojs from 'video.js';
import './AdvancedUIButton';

const Component = videojs.getComponent('ControlBar');

class ControlBar extends Component {
}

ControlBar.prototype.options_ = {
  children: [
    'playToggle',
    'volumePanel',
    'currentTimeDisplay',
    'durationDisplay',
    'progressControl',
    'liveDisplay',
    'seekToLive',
    'remainingTimeDisplay',
    'playbackRateMenuButton',
    'chaptersButton',
    'descriptionsButton',
    'subsCapsButton',
    'audioTrackButton',
    'fullscreenToggle',
    'advancedUIButton'
  ]
};

if ('exitPictureInPicture' in document) {
  ControlBar.prototype.options_.children.splice(
    ControlBar.prototype.options_.children.length - 1,
    0,
    'pictureInPictureToggle'
  );
}

Component.registerComponent('CustomControlBar', ControlBar);

export default ControlBar;
