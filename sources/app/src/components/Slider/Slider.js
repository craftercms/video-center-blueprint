import React, { Component } from "react";
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';

import SliderHolder from './SliderStyle';

class Slider extends Component {
  componentDidMount() {
    const data = Array.isArray(this.props.data) ? this.props.data : [this.props.data],
      descriptorKey = data[0].key;    // data is the list of descriptors (only 1 for this component)
                                      // Studio may return an array but studio's item selector is configured to be
                                      // max 1 item. So it'll always be first item of array
    this.setState({ descriptorKey: descriptorKey });
    this.props.getDescriptor(descriptorKey);
  }

  renderSlides(slides) {
    return slides.map((slide, i) => {
      return (
        <div key={i}>
          <div className="discover-slider__inner">
            <Link className="discover-slider__link" to={slide.url_s}>
              <div>
                <div className="image discover-slider__inner--background discover-slider__inner--background-mobile">
                  <div className="image__image"
                    style={{ backgroundImage: `url(${slide.background_s})` }}>
                  </div>
                </div>
                <div className="image discover-slider__inner--background discover-slider__inner--background-desktop">
                  <div className="image__image"
                    style={{ backgroundImage: `url(${slide.background_s})` }}>
                  </div>
                </div>
              </div>
              <div className={"discover-slider__inner--content"}>
                {slide.vod_s &&
                  <div className="discover-slider__inner--vod">
                    <span className="discover-slider__inner--vod-label">
                      {slide.vod_s}
                    </span>
                  </div>
                }

                <h1 className="heading discover-slider__inner--title heading--medium heading--slider">
                  {slide.title_t}
                </h1>

                {slide.logo_s &&
                  <div className="discover-slider__inner--title discover-slider__inner--title--logo"
                    style={{ backgroundImage: `url(${slide.logo_s})` }}>
                  </div>
                }

                <div className="discover-slider__inner--subtitle">
                  {ReactHtmlParser(slide.subtitle_s)}
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
    });
  }

  changeSlide(direction) {

    if ("previous" === direction) {
      this.slider.prev()
    } else {
      this.slider.next()
    }
  }

  renderSliderControls() {
    return (
      <div className="discover-slider__inner--nav">
        <label className="discover-slider__inner--nav-button discover-slider__inner--nav-prev" onClick={() => this.changeSlide("previous")}>
          <FontAwesomeIcon className="nav-icon" icon={faAngleLeft} />
        </label>
        <label className="discover-slider__inner--nav-button discover-slider__inner--nav-next" onClick={() => this.changeSlide("next")}>
          <FontAwesomeIcon className="nav-icon" icon={faAngleRight} />
        </label>
      </div>
    );
  }

  renderSlider(descriptor) {
    var slides = descriptor.component.slides_o;

    if (!(slides.item instanceof Array)) {
      slides = [slides.item];
    } else {
      slides = slides.item;
    }

    return (
      <SliderHolder className="hero-container hero-container__ghost">
        <Carousel className="discover-slider"
          effect="fade"
          ref={node => (this.slider = node)}
          autoplay>
          {this.renderSlides(slides)}
        </Carousel>

        {slides.length > 1 &&
          this.renderSliderControls()
        }
      </SliderHolder>
    )
  }

  render() {
    return (
      <div>
        {this.props.descriptors && this.state && this.state.descriptorKey && this.props.descriptors[this.state.descriptorKey] &&
          this.renderSlider(this.props.descriptors[this.state.descriptorKey])
        }
      </div>
    );
  }
}

export default Slider;
