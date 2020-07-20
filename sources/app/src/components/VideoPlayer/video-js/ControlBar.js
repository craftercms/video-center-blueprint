/**
 * @file control-bar.js
 */
import videojs from 'video.js';
import './AdvanceUIButton';

const Component = videojs.getComponent('ControlBar');

class ControlBar extends Component {}

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
    'advanceUIButton'
  ]
};

if ('exitPictureInPicture' in document) {
  ControlBar.prototype.options_.children.splice(
    ControlBar.prototype.options_.children.length - 1,
    0,
    'pictureInPictureToggle'
  );
}

console.log('holita');

Component.registerComponent('CustomControlBar', ControlBar);

export default ControlBar;
