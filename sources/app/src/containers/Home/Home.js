import React, { Component } from "react";
import { connect } from "react-redux";
import { setVideoStatus } from "../../actions/videoPlayerActions";

import Slider from '../../components/Slider/Slider.js';
import VideoCategories from '../../components/VideoCategories/VideoCategories.js';

import { contentStoreService } from '../../api.js';

class Home extends Component {
    componentWillMount() {
        this.props.dispatch(setVideoStatus( { ...this.props.videoStatus, docked: false } ));
    }

    componentDidMount() {
        const self = this;

        contentStoreService.getItem("/site/website/index.xml").then(item => {
            console.log(item)
            self.setState({ content: item });
            self.setState({ slider: item.descriptorDom.page.slider.item })
        });

        document.getElementById("mainHeader").classList.add("header--ghost");

        var categories = [
            {
                key: "featured-videos",
                value: "Featured Videos",
                query: ['content-type:"/component/video"', 'featured: "true"'] 
            },
            { 
                key: "latest-videos", 
                value: "Latest Videos",
                query: ['content-type:"/component/video"'],
                sort: "createdDate_dt desc"
            },
            {
                key: "featured-channels",
                value: "Featured Channels",
                type: "channel-card-alt",
                query: ['content-type:"/component/component-channel"', 'featured: "true"'],
                numResults: 3
            }
        ]

        this.setState({ channels: categories });
    }
    componentWillUnmount() {
        document.getElementById("mainHeader").classList.remove("header--ghost");
    }

    render() {
        return (
            <div>
                { this.state && this.state.slider &&
                    <Slider data={ this.state.slider }>
                    </Slider>
                }

                { this.state && this.state.channels &&
                    <VideoCategories categories={ this.state.channels }>
                    </VideoCategories>
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

export default connect(mapStateToProps)(Home);
