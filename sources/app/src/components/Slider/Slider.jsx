import React, { Component } from 'react';
import { Carousel } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import SliderHolder from './SliderStyle';
import Slide from '../Slide/Slide';
import { parseDescriptor } from '@craftercms/content';

class Slider extends Component {
  componentDidMount() {
    const data = Array.isArray(this.props.data) ? this.props.data : [this.props.data],
      descriptorKey = data[0].key;    // data is the list of descriptors (only 1 for this component)
                                      // Studio may return an array but studio's item selector is configured to be
                                      // max 1 item. So it'll always be first item of array
    this.setState({ descriptorKey });
    this.props.getDescriptor(descriptorKey);
  }

  changeSlide(direction) {

    if ('previous' === direction) {
      this.slider.prev();
    } else {
      this.slider.next();
    }
  }

  renderSliderControls() {
    return (
      <div className="discover-slider__inner--nav">
        <label
          className="discover-slider__inner--nav-button discover-slider__inner--nav-prev"
          onClick={() => this.changeSlide('previous')}
        >
          <FontAwesomeIcon className="nav-icon" icon={faAngleLeft} />
        </label>
        <label
          className="discover-slider__inner--nav-button discover-slider__inner--nav-next"
          onClick={() => this.changeSlide('next')}
        >
          <FontAwesomeIcon className="nav-icon" icon={faAngleRight} />
        </label>
      </div>
    );
  }

  renderSlider(descriptor) {
    var slides = descriptor.component.slides_o;
    const model = parseDescriptor(descriptor);

    if (!(slides.item instanceof Array)) {
      slides = [slides.item];
    } else {
      slides = slides.item;
    }

    return (
      <SliderHolder className="hero-container hero-container__ghost">
        <Carousel
          className="discover-slider"
          effect="fade"
          ref={node => (this.slider = node)}
          autoplay
        >
          {
            slides.map((slide, i) => <Slide key={i} slide={slide} model={model} index={i} fieldId="slides_o"/>)
          }
        </Carousel>

        {slides.length > 1 &&
        this.renderSliderControls()
        }
      </SliderHolder>
    );
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
