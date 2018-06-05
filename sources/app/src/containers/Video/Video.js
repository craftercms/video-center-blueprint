import React, { Component } from "react";
import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import VideoHolder from './VideoStyle.js';
import VideoSidebar from './VideoSidebar.js';

import { connect } from "react-redux";
import { setVideoInfo, setVideoStatus } from "../../actions/videoPlayerActions";

import { searchService } from '../../api.js';

class Video extends Component {
    constructor(props) {
        super(props);

        this.loadVideo(props);
    }

    componentWillMount() {  
        this.props.dispatch(setVideoStatus( { ...this.props.videoStatus, docked: true, currentVideoUrl: this.props.match.url } ));
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        // this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    componentWillReceiveProps(newProps){
        if(this.props.match.url !== newProps.match.url){
            this.loadVideo(newProps);
        }
    }

    loadVideo(props){
        var self = this,
        videoId = props.match.params.id;

        var query = searchService.createQuery();
            query.setQuery("*:*");
            query.setFilterQueries(["content-type:/component/video", "objectId:" + videoId]);
        
            
        searchService.search(query).then(cards => {
            var video = cards.response.documents[0],
                categories = [];

            this.props.dispatch(setVideoInfo(video));

            if( video["channels.item.key"].constructor === Array ){
                for (var i = 0, len = video["channels.item.key"].length; i < len; i++) {
                    categories.push( 
                        { key: video["channels.item.key"][i], value: video["channels.item.value_smv"][i] } 
                    );
                }
            }else{
                categories.push( 
                    { key: video["channels.item.key"], value: video["channels.item.value_smv"] } 
                );
            }

            self.setState({ categories: categories });


        }).catch(error => {
            
        });
    }

    updateDimensions() {
        // this.setState({width: $(window).width(), height: $(window).height()});

        var playerContainer = document.getElementById("app-content__player"),
            playerResize = document.querySelector(".global-video-player .player-container"),
            dimensions = {
                width: playerContainer.offsetWidth,
                height: playerContainer.offsetHeight
            },
            aspect = ( playerResize.offsetHeight * 100 ) / playerResize.offsetWidth,
            maxWidth = ( dimensions.height * 100 ) / aspect;

        console.log(dimensions);

        playerResize.style.minWidth = "160px";
        playerResize.style.minHeight = "90px";
        playerResize.style.maxWidth =  maxWidth + "px";
        playerResize.style.maxHeight = dimensions.height + "px";

        // console.log(document.getElementById("app-content__player"));
        // console.log(playerResize);
    }

    renderDetailsSection( video ) {
        return(     
            <div>
                <div className="segment segment--dark">
                    <div className="video-details">
                        <div className="video-details__header">
                            <div className="video-details__titles">
                                {/* <div className="video-details__thumbnail">
                                    <div className="image">
                                        <div className="image__image">
                                        </div>
                                    </div>
                                </div> */}
                                <div className="video-details__titles-content">
                                    <h1 className="heading video-details__heading heading--smaller"> { video.title_s } </h1>
                                    <h1 className="heading video-details__episode heading--default"> { video.summary_s } </h1>
                                </div>
                            </div>
                            <div className="video-details__links">
                                <div className="inline-button inline-button__text video-details__links-link">
                                    <i className="inline-button__icon fa fa-share-alt"></i>
                                    <span className="inline-button__text">share</span>
                                </div>
                                <a href="mailto:mail@mail.com" id="uservoice-video" className="video-details__links-link">
                                    <div className="inline-button inline-button__text"> 
                                        <i className="inline-button__icon fa fa-comment"></i>
                                        <span className="inline-button__text">feedback</span>
                                    </div>
                                </a>
                                {/* <a className="inline-button inline-button__text video-details__links-link" href="/show/AP-1VAXFHQMW1W11/red-bull-music-academy-lectures"> 
                                    <span className="inline-button__text">View Show</span>
                                </a> */}
                                {/* <div className="inline-button inline-button__text video-details__links-link"> 
                                    <span className="inline-button__text">Transcript</span>
                                </div> */}
                            </div>
                        </div>

                        <div className="video-details__description">
                            <p>
                                { video.description_html }
                            </p>
                        </div>
                        <hr/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <VideoHolder>

                { this.props.videoInfo &&
                    this.renderDetailsSection( this.props.videoInfo )
                }

                { this.state && this.state.categories &&
                    <VideoCategories categories={ this.state.categories }></VideoCategories>
                }
                
                <VideoSidebar/> 
            </VideoHolder>
        );
    }
}

function mapStateToProps(store) {
    return { 
        videoInfo: store.video.videoInfo,
        videoStatus: store.video.videoStatus
    };
}

export default connect(mapStateToProps)(Video);
