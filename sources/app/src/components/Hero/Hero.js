import React, { Component } from "react";
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { formatDate } from '../../utils';
import HeroHolder from '../Slider/SliderStyle';

class Hero extends Component {
  componentDidMount() {
    this.setState({ heroContent: this.props.data });
  }

  renderCountdown() {
    //since it is a hero (only one slide), it's the first item of array
    var { data } = this.props,
      formattedDate = formatDate(data[0].date_dt);

    return (
      <div className="hero__countdown">
        <div className="countdown-container__content" id="countdown">
          <div className="countdown--pre countdown--text">
            <div className="countdown__label">Upcoming</div>
            <div className="countdown__heading">{formattedDate.month} {formattedDate.monthDay}</div>
            <div className="countdown__live-time"> Live at {formattedDate.time} {formattedDate.timezone}</div>
          </div>
        </div>
      </div>
    );
  }

  renderHeroContent(hero) {
    const heroContent = hero[0];     //Hero content is always size 1, but comes into an array

    return (
      <div>
        <div className="discover-slider__inner">
          <Link className="discover-slider__link" to={heroContent.url_s}>
            <div>
              <div className="image discover-slider__inner--background discover-slider__inner--background-mobile">
                <div className="image__image"
                  style={{ backgroundImage: `url(${heroContent.background_s})` }}>
                </div>
              </div>
              <div className="image discover-slider__inner--background discover-slider__inner--background-desktop">
                <div className="image__image"
                  style={{ backgroundImage: `url(${heroContent.background_s})` }}>
                </div>
              </div>
            </div>
            <div className={"discover-slider__inner--content" + (this.props.hero ? ' hero_content' : '')}>
              {heroContent.vod_s &&
                <div className="discover-slider__inner--vod">
                  <span className="discover-slider__inner--vod-label">
                    {heroContent.vod_s}
                  </span>
                </div>
              }

              <h1 className="heading discover-slider__inner--title heading--medium heading--slider">
                {heroContent.title_t}
              </h1>

              {heroContent.logo_s &&
                <div className="discover-slider__inner--title discover-slider__inner--title--logo"
                  style={{ backgroundImage: `url(${heroContent.logo_s})` }}>
                </div>
              }

              <div className="discover-slider__inner--subtitle">
                {ReactHtmlParser(heroContent.subtitle_s)}
              </div>

              {this.props.hero &&
                this.renderCountdown()
              }

            </div>
          </Link>
        </div>
      </div>
    );
  }

  renderHero() {
    return (
      <HeroHolder className="hero-container hero-container__ghost">
        <Carousel className="discover-slider"
          effect="fade"
          ref={node => (this.hero = node)}
          autoplay>
          {this.renderHeroContent(this.state.heroContent)}
        </Carousel>
      </HeroHolder>
    )
  }

  render() {
    return (
      <div>
        {this.state && this.state.heroContent &&
          this.renderHero()
        }
      </div>
    );
  }
}

export default Hero;
