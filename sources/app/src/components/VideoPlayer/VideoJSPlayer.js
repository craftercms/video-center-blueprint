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
import AdvancedControlsBar from './VideoEditing/AdvancedControlsBar';
import 'video.js/dist/video-js.min.css';
import './videojs-theme.css';
import 'videojs-youtube/dist/Youtube.min';
import 'dashjs/dist/dash.all.min';
import 'videojs-contrib-dash/dist/videojs-dash.min';
import './video-js/ControlBar';

export function setPlayerSrc(player, video) {
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

class VideoJSPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      volume: 1,
      playbackSpeed: 1,
      isPlaying: props.videoStatus.playing,
      time: 0
    };
  }

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
        setPlayerSrc(this.player, newProps.video);
      }
    }
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

    setPlayerSrc(player, this.props.video);
    player.one('play', () => {
      updateDimensions();
    });

    const playPause = (type) => {
      const playing = (type === 'play');
      this.setState({ isPlaying: playing });
      this.props.dispatch(setVideoStatus({ ...this.props.videoStatus, playing }));
    };

    ['play', 'pause'].forEach((e) => {
      player.on(e, () => playPause(e));
    });

    player.on('openAdvancedUI', () => {
      player.customControlBar.addClass('hidden');
      this.setState({ openAdvancedUI: true });
    });

    player.on('timeupdate', () => {
      this.setState({ time: this.player.currentTime() });
    });

    player.on('volumechange', () => {
      this.setState({ volume: this.player.volume() });
    });

    player.on('loadedmetadata', () => {
      this.setState({ duration: player.duration() });
    });

    this.props.dispatch(setVideoStatus({ ...this.props.videoStatus, playing: true }));
    this.player = player;

  }

  onTogglePlay = () => {
    if (this.player.paused()) {
      this.player.play();
    } else {
      this.player.pause();
    }
  };

  onFullScreen = () => {
    if (!this.player.isFullscreen()) {
      this.player.requestFullscreen();
      this.onBackToSimpleMenu();
    } else {
      this.player.exitFullscreen();
    }
  };

  seek(secs) {
    let time = this.player.currentTime() + secs;
    this.player.currentTime(time < 0 ? 0 : time);
  }

  onSetVolume = (volume) => {
    this.player.volume(volume);
  };

  onSetPlaybackSpeed = (speed) => {
    this.setState({ playbackSpeed: speed });
    this.player.playbackRate(speed);
  };

  onSetTime = (time) => {
    this.setState({ time });
    this.player.currentTime(time);
  };

  onBackToSimpleMenu = () => {
    this.player.customControlBar.removeClass('hidden');
    this.setState({ openAdvancedUI: false });
  };

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
            //autoPlay
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
        {this.state?.openAdvancedUI &&
        <AdvancedControlsBar
          onSkipForward={() => this.seek(10)}
          onSkipBack={() => this.seek(-10)}
          isPlaying={this.state?.isPlaying}
          onTogglePlay={this.onTogglePlay}
          onFullScreen={this.onFullScreen}
          onSetVolume={this.onSetVolume}
          onSetTime={this.onSetTime}
          volume={this.state.volume}
          onSetPlaybackSpeed={this.onSetPlaybackSpeed}
          onBackToSimpleMenu={this.onBackToSimpleMenu}
          playbackSpeed={this.state.playbackSpeed}
          duration={this.state.duration}
          time={this.state.time}
          video={this.props.video}
        />}
      </>
    );
  }
}

export default VideoJSPlayer;
