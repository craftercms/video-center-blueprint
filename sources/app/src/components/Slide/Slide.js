import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { formatDate } from '../../utils';

class Slide extends Component {
  componentWillMount() {
    const { hero, slide } = this.props;

    if (hero && slide.date_dt) {
      this.formattedDate = formatDate(slide.date_dt);
    }
  }

  render() {
    const { hero, slide } = this.props;
    return (
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
          <div className={"discover-slider__inner--content" + ((hero && slide.date_dt) ? ' hero_content' : '')}>
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

            {this.props.hero && this.formattedDate &&
              <div className="hero__countdown">
                <div className="countdown-container__content" id="countdown">
                  <div className="countdown--pre countdown--text">
                    <div className="countdown__label">Upcoming</div>
                    <div className="countdown__heading">{this.formattedDate.month} {this.formattedDate.monthDay}</div>
                    <div className="countdown__live-time"> Live at {this.formattedDate.time} {this.formattedDate.timezone}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        </Link>
      </div>
    );
  }
}

export default Slide;
