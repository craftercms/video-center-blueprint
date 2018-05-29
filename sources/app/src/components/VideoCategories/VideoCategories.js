import React, { Component } from "react";
import VideoCategoriesHolder from "./VideoCategoriesStyle";
import Scrollspy from 'react-scrollspy';
import Cards from '../Cards/Cards.js';

//other categories: video-card - channel-card-alt - standard-card   - live-events-item

// const categoriesMap = {
//     "video-card" : "video-card video-card--has-description",
//     "channel-card": "channel-card-alt channel-card-alt--secondary"
// }


class VideoCategories extends Component {
    constructor(props) {
        super(props);

        this.sectionsScrollSpy = [];
        props.categories.map((category, i) => {
            this.sectionsScrollSpy.push("section-" + category.key);
        });
    }

    renderCards(category) {
        const isSearch = this.props.query && category.key === "top-results";
        
        if ( isSearch ) {
            return <Cards category={category} query={this.props.query}></Cards>;
        }
        return <Cards category={category}></Cards>;

    }

    renderArticlesSections(){
        return this.props.categories.map((category, i) => {
            var gridElClass;
            // switch( category.type ) {
            switch( "video-card" ) {
                case "video-card":
                    gridElClass = "static-grid static-grid--3 static-grid--break-at-480";
                    break;
                case "channel-card-alt":
                    gridElClass = "static-grid static-grid--4 static-grid--standard static-grid--break-at-480";
                    break;
                case "standard-card":
                    gridElClass = "static-grid static-grid--4 static-grid--standard static-grid--break-at-480";
                    break;
                default:
                    gridElClass = "";
            }


            return (
                <section className="segment" key={i} id={"section-" + category.key}>
                    <div className="content-container__block content-container__block--0 content-container__block--active">
                        <div className="segment">
                            <h2 className="heading heading--default heading--section">{ category.value }</h2>

                            <div className={ gridElClass }>
                                {this.renderCards( category )}
                            </div>
                        </div>
                    </div>
                </section>
            );
        });
    }

    renderCategoriesItems() {
        
        return this.props.categories.map((category, i) => {
            return (
                <li key={i} className={ "inline-nav__item inline-nav__item_0" } >
                    <a href={"#section-" + category.key} className={ "inline-nav__link" }>
                        { category.value }
                    </a>
                </li>
            );
        });
    }

    handleScroll() {
        var stickyBar = document.getElementById('stickyBar');
        var stickyBarTop = stickyBar.getBoundingClientRect().top;

        if( stickyBarTop === 0 ){
            stickyBar.classList.add("inline-nav__sticky--stuck");
        }else{
            stickyBar.classList.remove("inline-nav__sticky--stuck");
        }
    }

    componentDidMount() {
        document.getElementsByClassName("app-content__main")[0].addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.getElementsByClassName("app-content__main")[0].removeEventListener('scroll', this.handleScroll);
    }

    render() {
      
        return (
            <VideoCategoriesHolder>
                
                <div id="stickyBar" className="inline-nav__sticky">
                    <nav className="inline-nav inline-nav--align-left">
                        <div className="inline-nav__inner">
                            <Scrollspy className="inline-nav__ul" 
                                        items={ this.sectionsScrollSpy } 
                                        currentClassName="inline-nav__item--active"
                                        rootEl={ ".app-content__main" }
                                        ref={node => (this.scrollspy = node)}>
                                {this.renderCategoriesItems()}
                            </Scrollspy>
                        </div>
                    </nav>
                </div>

                <div className="content-container">
                    { this.renderArticlesSections() }
                </div>

            </VideoCategoriesHolder>
        );
    }
}

export default VideoCategories;
