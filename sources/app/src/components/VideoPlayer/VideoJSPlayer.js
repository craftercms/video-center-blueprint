/*!
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

import React, { Component } from 'react';
import { setVideoStatus } from '../../actions/videoPlayerActions';
import { updateDimensions } from './Common';
import videojs from 'video.js';
import AdvancedControlsBar from './AdvancedControlsBar';
import 'video.js/dist/video-js.min.css';
import './videojs-theme.css';
import 'videojs-youtube/dist/Youtube.min';
import 'dashjs/dist/dash.all.min';
import 'videojs-contrib-dash/dist/videojs-dash.min';
import './video-js/ControlBar';

class VideoJSPlayer extends Component {

  componentDidMount() {
    this.props.video && this.initPlayer();
    window.addEventListener('resize', updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', updateDimensions);
    // this.player.destroy();
  }

  componentWillReceiveProps(newProps) {
    // new video Info -> load new manifestUri into player
    if (this.props.video && newProps.video) {
      if (this.props.video.id !== newProps.video.id) {
        this.setPlayerSrc(this.player, newProps.video);
      }
    }
  }

  setPlayerSrc(player, video) {
    const contentType = video['content-type'];
    let src, type;

    if (contentType === '/component/youtube-video') {   // YOUTUBE
      src = `https://www.youtube.com/watch?v=${video.youTubeVideo_s}`;
      type = 'video/youtube';
    } else {
      if (video.origin_o.item.component.url_s.includes('m3u8')) {   // HLS
        src = video.origin_o.item.component.url_s;
        type = 'application/x-mpegURL';
      } else if (video.origin_o.item.component.url_s.includes('mpd')) {  // DASH
        src = video.origin_o.item.component.url_s;
        type = 'application/dash+xml';
      }
    }

    player.src({
      src,
      type
    });

  }

  initPlayer() {
    const player = videojs(this.refs.video, {
      controls: true,
      liveui: true,
      // responsive: true,
      children: [
        'mediaLoader',
        'posterImage',
        'textTrackDisplay',
        'loadingSpinner',
        'bigPlayButton',
        'liveTracker',
        'customControlBar',
        'errorDisplay',
        'textTrackSettings',
        'resizeManager'
      ]
    });

    this.setPlayerSrc(player, this.props.video);
    player.one('play', () => {
      updateDimensions();
    });

    const playPause = (type) => {
      const playing = (type === 'play');
      this.setState({ ...this.state, isPlaying: playing });
      this.props.dispatch(setVideoStatus({ ...this.props.videoStatus, playing }));
    };

    ['play', 'pause'].forEach((e) => {
      player.on(e, () => playPause(e));
    });

    player.on('openAdvancedUI', () => {
      player.customControlBar.addClass('hidden');
      this.setState({ ...this.state, openAdvancedUI: true });
    });

    player.on('volumechange', () => {
      this.setState({ ...this.state, volume: this.player.volume() * 100 });
    });

    this.props.dispatch(setVideoStatus({ ...this.props.videoStatus, playing: true }));
    this.player = player;

  }

  onTogglePlay() {
    if (this.player.paused()) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  seek(secs) {
    let time = this.player.currentTime() + secs;
    this.player.currentTime(time < 0 ? 0 : time);
  }

  onSetVolume(nextVolume) {
    let volume = nextVolume / 100;
    this.player.volume(volume);
  }

  onSetPlaybackSpeed(speed) {
    this.setState({ ...this.state, playbackSpeed: speed });
    this.player.playbackRate(speed);
  }

  render() {
    return (
      <>
        <div
          id="videoContainer"
          className="player-container stream-player"
          style={{ margin: '0 auto' }}
        >
          <video
            className="video-js vjs-theme-vc"
            controls
            preload="auto"
            width="640"
            height="264"
            autoPlay
            style={{ width: '100%', height: '100%', margin: 'auto' }}
            ref="video"
          >
            <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a
              web browser that
              <a
                href="https://videojs.com/html5-video-support/" target="_blank"
                rel="noopener noreferrer"
              >supports HTML5 video</a>
            </p>
          </video>
        </div>
        {/*this.state?.openAdvancedUI &&*/}
        <AdvancedControlsBar
          onSkipForward={() => this.seek(10)}
          onSkipBack={() => this.seek(-10)}
          isPlaying={this.state?.isPlaying}
          onTogglePlay={() => this.onTogglePlay()}
          onSetVolume={(volume) => this.onSetVolume(volume)}
          volume={this.state?.volume ? this.state.volume : this.player?.volume() * 100}
          onSetPlaybackSpeed={(speed) => this.onSetPlaybackSpeed(speed)}
          playbackSpeed={this.state?.playbackSpeed ? this.state.playbackSpeed : this.player?.playbackSpeed}
        />
      </>
    );
  }
}

export default VideoJSPlayer;
