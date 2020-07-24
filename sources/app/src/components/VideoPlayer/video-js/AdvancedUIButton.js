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
 * @file advance-ui-button.js
 */

import videojs from 'video.js';

const Button = videojs.getComponent('Button');
const Component = videojs.getComponent('Component');

/**
 * Toggle fullscreen video
 *
 * @extends Button
 */
class AdvancedUIButton extends Button {

  /**
   * This gets called when an `FullscreenToggle` is "clicked". See
   * {@link ClickableComponent} for more detailed information on what a click can be.
   *
   * @param {EventTarget~Event} [event]
   *        The `keydown`, `tap`, or `click` event that caused this function to be
   *        called.
   *
   * @listens tap
   * @listens click
   */
  handleClick(event) {
    this.player_.trigger('openAdvancedUI');
  }

}

/**
 * The text that should display over the `FullscreenToggle`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */
AdvancedUIButton.prototype.controlText_ = 'AdvancedUIButton';

Component.registerComponent('AdvancedUIButton', AdvancedUIButton);

export default AdvancedUIButton;
