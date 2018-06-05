import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from '../../components/Slider/Slider.js';

import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import { setVideoStatus } from "../../actions/videoPlayerActions";

class LiveEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchId: this.props.match.params.query,
            categories: [
                {
                    key: "upcoming-events",
                    value: "Upcoming Events",
                    type: "live-event-item",
                    query: ['content-type:"/component/stream"'],
                    numResults: 6
                },
                { 
                    key: "past-events", 
                    value: "Past Events",
                    type: "live-event-item",   //TO RENDER CHANNEL CARD STYLING
                    query: ['content-type:"/component/stream"'] ,
                    numResults: 6
                }
            ]
        };
    }

    componentWillMount() {
        this.props.dispatch(setVideoStatus( { ...this.props.videoStatus, docked: false } ));
    }
    render() {
        return (
        <div>
            {/* <Slider></Slider> */}

            {/* <VideoCategories></VideoCategories> */}

            <VideoCategories 
                categories={ this.state.categories }>
            </VideoCategories>
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