import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { setVideoStatus } from "../../actions/videoPlayerActions";

class VideosPlayer extends Component {
    onStart(e) {
        if( this.props.seekTo ){
            this.refs.video.seekTo(this.props.seekTo);
        }
    }

    onPlaying(e) {
        this.props.dispatch(setVideoStatus( { ...this.props.videoStatus, playing: true } ));
    }

    onStopped(e){
        this.props.dispatch(setVideoStatus( { ...this.props.videoStatus, playing: false } ));
    }

    render() {
        const { video } = this.props;

        return (
            <div id="videoContainer" className="player-container stream-player" style={{ margin: '0 auto' }}>
                <ReactPlayer 
                    className="video-player"
                    controls={ this.props.controls }
                    url={ `https://www.youtube.com/watch?v=${ video.youTubeVideo }` }
                    playing
                    ref="video"
                    width="100%"
                    height="100%"
                    onReady = { (e) => { this.onStart(e) } }
                    onPlay = { (e) => { this.onPlaying(e) } }
                    onPause = { (e) => { this.onStopped(e) } }
                    onEnded = { (e) => { this.onStopped(e) } }
                />
            </div>
        );
    }
}

export default VideosPlayer;