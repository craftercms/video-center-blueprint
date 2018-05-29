import React, { Component } from "react";
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

import { studioConfig } from '../../settings';
import { EngineClient } from '@craftercms/sdk/lib/craftercms';

import SliderHolder from './SliderStyle';

class Slider extends Component {
    componentDidMount() {
        var engineClient = new EngineClient(studioConfig.baseUrl, studioConfig.site);
        this.contentStoreService = engineClient.contentStoreService;
    
        if( this.props.localData ){
            console.log("SLIDER, local data");
            this.setState({ slides: this.props.data });
        }else{
            this.getSlidesContent();
        }
        
    
    }

    getSlidesContent() {
        const self = this;

        this.contentStoreService.getItem(this.props.data.key).then(item => {
            var slides = item.descriptorDom.component.slides;

            if( !(slides.item instanceof Array) ){
                slides = [slides.item];
            }else{
                slides = slides.item;
            }

            self.setState({ content: item });
            self.setState({ slides: slides });

        });
    }

    renderSlides() {
        return this.state.slides.map((slide, i) => {
            return (
                <div key={ i }>
                    <div className="discover-slider__inner">
                        <Link className="discover-slider__link" to={ slide.url }>
                            <div>
                                <div className="image discover-slider__inner--background discover-slider__inner--background-mobile">
                                    <div className="image__image" 
                                        style={{ backgroundImage: `url(${ slide.background })` }}>
                                    </div>
                                </div>
                                <div className="image discover-slider__inner--background discover-slider__inner--background-desktop">
                                    <div className="image__image" 
                                        style={{ backgroundImage: `url(${ slide.background })` }}>
                                    </div>
                                </div>
                            </div>
                            <div className="discover-slider__inner--content">
                                { slide.vod &&
                                    <div className="discover-slider__inner--vod">
                                        <span className="discover-slider__inner--vod-label">
                                            { slide.vod }
                                        </span>
                                    </div>
                                }
                                
                                <h1 className="heading discover-slider__inner--title heading--medium heading--slider">
                                    { slide.title }
                                </h1>

                                { slide.logo &&
                                    <div className="discover-slider__inner--title discover-slider__inner--title--logo" 
                                        style={{ backgroundImage: `url(${ slide.logo })` }}>
                                    </div>
                                }

                                <div className="discover-slider__inner--subtitle">
                                    { slide.subtitle }
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            );
        });
    }

    changeSlide( direction ) {

        if("previous" === direction){
            this.slider.prev()
        }else{
            this.slider.next()
        }
    }

    render() {
        return (
            <SliderHolder className="hero-container hero-container__ghost">
                { this.state && this.state.slides &&
                    <Carousel className="discover-slider" 
                        effect="fade"
                        ref={node => (this.slider = node)}
                        autoplay>
                        { this.renderSlides() }
                    </Carousel> 
                }

                {this.state && this.state.slides && this.state.slides.length > 1 &&
                    <div className="discover-slider__inner--nav">
                        <label className="discover-slider__inner--nav-button discover-slider__inner--nav-prev" onClick={() => this.changeSlide("previous")}>
                            <i className="fa fa-angle-left"></i>
                        </label>
                        <label className="discover-slider__inner--nav-button discover-slider__inner--nav-next" onClick={() => this.changeSlide("next")}>
                            <i className="fa fa-angle-right"></i>
                        </label>
                    </div> 
                }
                
            </SliderHolder>
        );
    }
}

export default Slider;