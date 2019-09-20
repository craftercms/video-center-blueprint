import React, { Component } from "react";
import { Carousel } from 'antd';

import Slide from '../Slide/Slide';
import HeroHolder from '../Slider/SliderStyle';

class Hero extends Component {
  componentDidMount() {
    this.setState({ heroContent: this.props.data });
  }

  render() {
    return (
      <div>
        {this.state && this.state.heroContent &&
          <HeroHolder className="hero-container hero-container__ghost">
            <Carousel className="discover-slider"
              effect="fade"
              ref={node => (this.hero = node)}
              autoplay>
              <Slide slide={ this.state.heroContent[0] } hero={true}/>  {/* Hero content is always size 1, but comes into an array */}
            </Carousel>
          </HeroHolder>
        }
      </div>
    );
  }
}

export default Hero;
