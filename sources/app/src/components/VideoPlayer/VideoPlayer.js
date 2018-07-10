import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import VideosPlayer from '../../containers/Video/videosPlayer';
import StreamsPlayer from '../../containers/Video/streamsPlayer';

import { setVideoStatus, setVideoInfo } from "../../actions/videoPlayerActions";

var Player = {};
class VideoPlayer extends Component {
    componentWillReceiveProps(newProps) {

        //If video not loaded and it has new video Info -> load video
        if(newProps.videoInfo !== null && (!this.props.videoStatus.loaded)){
            this.loadVideo(newProps.videoInfo);
        }

        //If video is not playing, and view is not docked (so is fixed) -> unload video
        if(newProps.videoStatus && ( newProps.videoStatus.loaded === true )
            && ( newProps.videoStatus.playing === false) 
            &&  (newProps.videoStatus.docked === false )){
            this.unloadVideo();
        }

        //If new props contains a different type of video than current (stream, video) => load new one
        if(this.props.videoInfo && newProps.videoInfo){
            var currentType = this.props.videoInfo.youTubeVideo ? "video" : "stream",
                newType = newProps.videoInfo.youTubeVideo ? "video" : "stream";

            if( currentType !== newType ){
                this.loadVideo(newProps.videoInfo);
            }
        }
    }

    loadVideo(videoInfo) {
        var videoType = videoInfo.youTubeVideo ? "video" : "stream";        //TODO: update, not only youtube link

        Player = videoType === "video" ? VideosPlayer : StreamsPlayer;
        this.props.dispatch(setVideoStatus( { ...this.props.videoStatus, loaded: true } ));
    }

    unloadVideo() {
        this.props.dispatch(setVideoStatus( { ...this.props.videoStatus, loaded: false } ));
        this.props.dispatch(setVideoInfo( null ));
    }

    render() {
        return (
            <div id="app-content__player" className="app-content__player">
                {this.props.videoStatus.loaded &&
                    <div className="app-content__player-wrapper">
                        <div className={ `global-video-player global-video-player--visible global-video-player--${ this.props.videoStatus.docked ? 'docked' : 'fixed' }` }>
                            <div id="videoPlayerAspect" className="global-video-player__aspect">
                                <div className="global-video-player__inner">
                                    <Player video={ this.props.videoInfo }
                                        videoStatus={ this.props.videoStatus }
                                        dispatch={ this.props.dispatch }
                                        controls={ true }
                                    />

                                    <Link className="fixed-player__link-overlay" to={ this.props.videoStatus.currentVideoUrl }>
                                    </Link>

                                    <a className="global-video-player__close" onClick={ this.unloadVideo.bind(this) }>
                                        <i className="search__icon fa fa-times"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(store) {
    return { 
        videoInfo: store.video.videoInfo,
        videoStatus: store.video.videoStatus
    };
}

export default connect(mapStateToProps)(VideoPlayer);
