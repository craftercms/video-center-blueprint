import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from '../../components/Slider/Slider.js';

import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import { setVideoStatus } from "../../actions/videoPlayerActions";

class LiveEvents extends Component {
    componentWillMount() {
        this.props.dispatch(setVideoStatus( { ...this.props.videoStatus, docked: false } ));
    }
    render() {
        return (
        <div>
            <Slider></Slider>

            <VideoCategories></VideoCategories>
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

export default connect(mapStateToProps)(LiveEvents);