import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { searchService } from '../../api.js';

class Cards extends Component {
    componentDidMount() {
        this.searchCards(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.searchCards(newProps);
    }

    searchCards(props) {
        const self = this;

        var query = searchService.createQuery(),
            category = props.category;

        if(category.query){
            if(props.query !== ""){
                query.setQuery("*:*");
                query.setFilterQueries(category.query);
                // query.setFilterQueries(["content-type:/component/video", "title_t: (*" + props.query + "*)"]);
                query.setNumResults(category.numResults);   //   OLD VERSION
                // query.numResults = 2;     //   NEW VERSION - NOT ON MASTER YET

                if(category.sort !== ""){
                    query.addParam('sort', category.sort);
                }

                searchService.search(query).then(cards => {
                    self.setState({ cards: cards.response.documents });                    
                }).catch(error => {
                    
                });
            }
        }else{
            category = props.category.key

            query.setQuery("*:*");
            query.setFilterQueries(["content-type:/component/video", "channels.item.key:" + category]);
            // query.setNumResults(2);    //  OLD VERSION
            // query.numResults = 2;      //  NEW VERSION - NOT ON MASTER YET
            searchService.search(query).then(cards => {
                self.setState({ cards: cards.response.documents });
            }).catch(error => {
                
            });
        }
    }

    // renderArticles( category ) {
    //     return articles.map((article, i) => {
    //         // switch( category.type ) {
    //         switch( "video-card" ) {
    //             case "video-card":
    //                 return (

    //                 break;
    //             case "channel-card-alt":

    //                 break;
    //             case "standard-card":
    //                 return (
    //                     <div className="static-grid__item" key={article.id}>
    //                         <div className="standard-card">
    //                             <a className="standard-card__link" href="/show/AP-1V6V7K8HN1W11/the-way-of-the-wildcard">
    //                                 <div className="image standard-card__image">
    //                                     <div className="image__image" style={{ backgroundImage: `url(${ article.image })` }}></div>
    //                                 </div>
    //                             </a>
    //                         </div>
    //                     </div>
    //                 );
    //                 break
    //             default:
    //                 console.log("test")
    //         }

    //     });
    // }

    renderCards() {
        // console.log(this.state.cards);

        return this.state.cards.map((card, i) => {
            var componentUrl = card["content-type"] === "/component/stream" ? "/stream/" : "/video/",
                categoryType = this.props.category.type ? this.props.category.type : "video-card";

            switch( categoryType ) {
                case "video-card":
                    return (
                        <div className="static-grid__item" key={ card.id }>
                            <div className="video-card video-card--has-description">
                                <Link className="video-card__link" to={ componentUrl + card.objectId }>
                                    <div>
                                        <div className="image video-card__image--background" style={{ background: 'transparent' }}>
                                            <div className="image__image" style={{ backgroundImage: `url(${ card.thumbnail })` }}></div>
                                        </div>
                                        <video className="image preview-video" loop="" preload="auto" playsInline=""></video>
                                    </div>
                                    <div className="video-card__content">
                                        <div className="video-card__time"> { card.length } </div>
                                        <h3 className="heading video-card__heading heading--default heading--card">{ card.title_s }</h3>
                                        <div className="video-card__description"> { card.summary_s } </div>
                                        <div className="video-card__long-description"> { card.description_html } </div>
                                        <div className="video-card__progress" style={{ width: '0%' }}></div>
                                    </div>
                                    <div className="video-card__play-button">
                                        <i className="fa fa-play"/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                    break;
                case "channel-card-alt":
                    var url = card["file-name"].replace(".xml", "");
                    
                    return (
                        <div className="static-grid__item" key={card.id}>
                            <div className="channel-card-alt">
                                <Link className="channel-card-alt__link" to={`/channel/${ url }`}>
                                    <div className="image channel-card-alt__image">
                                        <div className="image__image" style={{ backgroundImage: `url(${ card.thumbnailImage })` }}>
                                        {/* <div className="image__image" style={{ backgroundImage: `url("/static-assets/images/videos/4d12b7de-0c73-e205-cdbb-784e3821f1c0/why-is-glass-transparent.jpg")` }}> */}
                                            <div className="channel-card-alt__overlay"></div>
                                        </div>
                                    </div>
                                    <h2 className="channel-card-alt__heading"> { card["internal-name"] } </h2>
                                </Link>
                            </div>
                        </div>
                    );
                    break;
                case "standard-card":
                    return (
                        <div className="static-grid__item" key={card.id}>
                            {/* <div className="standard-card">
                                <a className="standard-card__link" href="/show/AP-1V6V7K8HN1W11/the-way-of-the-wildcard">
                                    <div className="image standard-card__image">
                                        <div className="image__image" style={{ backgroundImage: `url(${ article.image })` }}></div>
                                    </div>
                                </a>
                            </div> */}
                        </div>
                    );
                    break
                default:
                    console.log("test")
            }
        });
    }

    render() {
        return (
            <div className="static-grid__items">
                { this.state && this.state.cards &&
                    this.renderCards()
                }
                {
                    this.state && this.state.cards && this.state.cards.length === 0 &&
                        <div className="segment">
                            <div style={{textAlign: "center", fontSize: "3rem", fontWeight: '700', padding: "15rem 0px 25rem", minHeight: "50vh" }}>
                                No results
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default Cards;
