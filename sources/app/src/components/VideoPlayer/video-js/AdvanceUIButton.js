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
class AdvanceUIButton extends Button {

  /**
   * Creates an instance of this class.
   *
   * @param {Player} player
   *        The `Player` that this class should be attached to.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   */
  constructor(player, options) {
    super(player, options);
  }

  /**
   * Builds the default DOM `className`.
   *
   * @return {string}
   *         The DOM `className` for this object.
   */
  buildCSSClass() {
    return `vjs-advance-ui-button ${super.buildCSSClass()}`;
  }

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
    console.log('clicked')
  }

}

/**
 * The text that should display over the `FullscreenToggle`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */
AdvanceUIButton.prototype.controlText_ = 'AdvanceUIButton';

Component.registerComponent('AdvanceUIButton', AdvanceUIButton);

export default AdvanceUIButton;
