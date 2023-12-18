import React, { Component } from 'react';
import { Carousel } from 'antd';

import HeroHolder from '../Slider/SliderStyle';
import HeroContent from './HeroContent';

class Hero extends Component {
  componentDidMount() {
    this.setState({ heroContent: this.props.data });
  }

  render() {
    const { model, onChange } = this.props;

    return (
      <div>
        {this.state && this.state.heroContent &&
        <HeroHolder className="hero-container hero-container__ghost">
          <Carousel
            className="discover-slider"
            effect="fade"
            ref={node => (this.hero = node)}
            autoplay
          >
            <HeroContent
              model={model}
              slide={this.state.heroContent}
              hero={true}
              onChange={onChange}
            />
          </Carousel>
        </HeroHolder>
        }
      </div>
    );
  }
}

export default Hero;
