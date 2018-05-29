import React, { Component } from "react";
import { connect } from "react-redux";

import { setVideoStatus } from "../../actions/videoPlayerActions";
import Slider from '../../components/Slider/Slider.js';
import VideoCategories from '../../components/VideoCategories/VideoCategories.js';

import { contentStoreService } from '../../api.js';

class Channel extends Component {
    constructor(props) {
        super(props);

        //categories = new/featured, all videos, all streams, related 

        this.getChannelInfo(props);
    }

    componentWillMount() {
        this.props.dispatch(setVideoStatus( { ...this.props.videoStatus, docked: false } ));
    }

    componentDidMount() {
        document.getElementById("mainHeader").classList.add("header--ghost");
    }

    componentWillUnmount() {
        document.getElementById("mainHeader").classList.remove("header--ghost");
    }

    componentWillReceiveProps(newProps){
        if(this.props.match.url !== newProps.match.url){
            this.getChannelInfo(newProps);
        }
    }

    getChannelInfo(props) {
        var self = this,
            channelName = props.match.params.name,
            channelHero = [];

        contentStoreService.getItem(`/site/components/channels/${ channelName }.xml`).then(item => {
            var channelContent = item.descriptorDom.component;

            channelHero.push({
                url: "#",
                background: channelContent.heroImage,
                title: channelContent["internal-name"],
                subtitle: channelContent.description
            })

            self.setState({ slider: channelHero })
        });

        this.state = {
            categories: [
                {
                    key: "featured",
                    value: "Featured",
                    query: ["content-type:/component/video", 'channels.item.key: "computer-science"'] 
                },
                { 
                    key: "related-channels", 
                    value: "Related Channels",
                    type: "channel-card-alt",   //TO RENDER CHANNEL CARD STYLING
                    query: ['content-type:"/component/component-channel"'] ,
                    numResults: 3
                }
            ]
        };
    }

    render() {
        return (
            <div>
                { this.state && this.state.slider &&
                    <Slider data={ this.state.slider }
                        localData={ true }
                    >
                    </Slider>
                }

                <VideoCategories 
                    categories={ this.state.categories } >
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

export default connect(mapStateToProps)(Channel);
