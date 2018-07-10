import React, { Component } from "react";
import { connect } from "react-redux";
import { isNullOrUndefined } from 'util';

import { getItem, search } from '@craftercms/redux';
import { SearchService } from '@craftercms/search';

import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import VideoHolder from './VideoStyle.js';
import Slider from '../../components/Slider/Slider.js';
import VideoSidebar from './VideoSidebar.js';
import { setVideoInfo, setVideoStatus } from "../../actions/videoPlayerActions";

class Video extends Component {
    constructor(props) {
        super(props);

        this.loadVideo(props);
    }

    componentWillMount() {  
        this.props.setVideoStatus( { ...this.props.videoStatus, docked: true, currentVideoUrl: this.props.match.url } );
    }

    componentDidMount() {
        // window.addEventListener("resize", this.updateDimensions);
        // this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        document.getElementById("mainHeader").classList.remove("header--ghost");
    }

    componentWillReceiveProps(newProps){
        var { match, searchResults } = this.props,
            searchEntry = searchResults.entries[this.searchId],
            newSearchEntry = newProps.searchResults.entries[this.searchId];

        if(match.url !== newProps.match.url){
            this.loadVideo(newProps);
        }

        if( 
            ( isNullOrUndefined(searchEntry) && !isNullOrUndefined(newSearchEntry) )
            || ( !isNullOrUndefined(searchEntry) && !isNullOrUndefined(newSearchEntry))
            && newProps.searchResults.entries[this.searchId]
        ){
            this.setVideo(newProps.searchResults.entries[this.searchId]);
        }

    }

    loadVideo(props){
        var self = this,
            videoId = props.match.params.id;
       
        var query = SearchService.createQuery('solr');
        this.searchId = query.uuid;
        query.query = "*:*";
        query.filterQueries = ["content-type:/component/video", "objectId:" + videoId];

        this.props.search(query);

        // this.videoUrl = props.match.path.indexOf('/video') !== -1
        //     ? '/site/videos/'
        //     : '/site/streams/';

        // this.videoUrl += videoId + '.xml';

        // if(!(props.items.entries[this.videoUrl])){
        //     this.props.getItem(this.videoUrl)
        // }
        
    }

    setVideo(searchResult) {
        var { setVideoInfo } = this.props;

        if(searchResult.numFound > 0){
            var video = searchResult.documents[0],
                categories = [],
                upcomingVideoHero = [];

            var videoStartDate = new Date(video.startDate_dt),
                videoEndDate = new Date(video.endDate_dt),
                now = new Date();

            if(video['content-type'] === '/component/stream' && videoStartDate > now ){
                //TODO: when it was on a video and changes to upcoming stream -> needs to remove 
                //      old video an set new video info.

                document.getElementById("mainHeader").classList.add("header--ghost");

                upcomingVideoHero.push({
                    url: "#",
                    background: video.thumbnail,
                    title: video.title_s,
                    subtitle: video.description_html,
                    date: video.startDate_dt
                })
    
                this.setState({ slider: upcomingVideoHero })
            }else{
                setVideoInfo(video);
            }

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

            this.setState({ categories: categories });
        }

    }

    updateDimensions() {
        // this.setState({width: $(window).width(), height: $(window).height()});

        var playerContainer = document.getElementById("app-content__player"),
            playerResize = document.querySelector(".global-video-player .player-container"),
            containerResize = document.querySelector('#videoPlayerAspect'),
            dimensions = {
                width: playerContainer.offsetWidth,
                height: playerContainer.offsetHeight
            },
            aspect = ( playerResize.offsetHeight * 100 ) / playerResize.offsetWidth,
            maxWidth = ( dimensions.height * 100 ) / aspect;

        // containerResize.style.height = dimensions.height + "px";

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
        var { videoInfo, items, searchResults } = this.props;
        return (
            <VideoHolder>

                { this.state && this.state.slider &&
                    <Slider data={ this.state.slider }
                        localData={ true }
                        hero={ true }
                    >
                    </Slider>
                }

                { videoInfo &&
                    this.renderDetailsSection( videoInfo )
                }

                { this.state && this.state.categories &&
                    <VideoCategories categories={ this.state.categories }></VideoCategories>
                }
                
                {/* <VideoSidebar/>  */}
            </VideoHolder>
        );
    }
}

function mapStateToProps(store) {
    return { 
        videoInfo: store.video.videoInfo,
        videoStatus: store.video.videoStatus,
        items: store.craftercms.items,
        searchResults: store.craftercms.search
    };
}

function mapDispatchToProps(dispatch) {
    return({
        getItem: (url) => { dispatch(getItem(url)) },
        search: (query) => { dispatch(search(query)) },
        setVideoStatus: (status) => { dispatch(setVideoStatus(status)) },
        setVideoInfo: (info) => { dispatch(setVideoInfo(info)) }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
