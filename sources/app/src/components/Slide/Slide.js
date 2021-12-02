import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Field } from '@craftercms/experience-builder/react';

class Slide extends Component {
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { model, index, fieldId, slide } = this.props;

    return (
      <div className="discover-slider__inner">
        <Field
          component={Link}
          model={model}
          fieldId={fieldId}
          index={index}
          className="discover-slider__link"
          to={slide.url_s}
        >
          <div>
            <div
              className="image discover-slider__inner--background discover-slider__inner--background-mobile"
            >
              <div
                className="image__image"
                style={{ backgroundImage: `url("${slide.background_s}")` }}
              >
              </div>
            </div>
            <div
              className="image discover-slider__inner--background discover-slider__inner--background-desktop"
            >
              <div
                className="image__image"
                style={{ backgroundImage: `url("${slide.background_s}")` }}
              >
              </div>
            </div>
          </div>
          <div
            className={`discover-slider__inner--content`}
          >
            {slide.vod_s &&
            <div className="discover-slider__inner--vod">
              <Field
                component="span"
                className="discover-slider__inner--vod-label"
                model={model}
                index={index}
                fieldId={`${fieldId}.vod_s`}
              >
                {slide.vod_s}
              </Field>
            </div>
            }

            <Field
              component="h1"
              className="heading discover-slider__inner--title heading--medium heading--slider"
              model={model}
              index={index}
              fieldId={`${fieldId}.title_t`}
            >
              {slide.title_t}
            </Field>

            {slide.logo_s &&
            <div
              className="discover-slider__inner--title discover-slider__inner--title--logo"
              style={{ backgroundImage: `url("${slide.logo_s}")` }}
            >
            </div>
            }

            <Field
              className="discover-slider__inner--subtitle"
              model={model}
              index={index}
              fieldId={`${fieldId}.subtitle_s`}
            >
              {ReactHtmlParser(slide.subtitle_s)}
            </Field>
          </div>
        </Field>
      </div>
    );
  }
}

export default Slide;
