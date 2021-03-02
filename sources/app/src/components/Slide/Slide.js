import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { Field } from '@craftercms/studio-guest/react';

import { formatDate } from '../../utils';

function twoDigitNumber(num, sep = false, unit = '') {
  let result = '00';
  if (num > 0) {
    result = ((num >= 10) ? num : `0${num}`);
  }
  return result + unit + (sep ? ':' : '');
}

class Slide extends Component {

  interval = null;

  constructor(props) {
    super(props);

    this.state = {
      eventDate: null,
      showCountdown: false,
      countdown: { minutes: 0, seconds: 0 }
    };
  }

  componentDidMount() {
    const { hero, slide, onChange } = this.props;

    if (hero && slide.date_dt) {

      const runCountDownCheck = (date) => {

        const formattedDate = formatDate(date);
        const momentDate = moment(formattedDate.dateObj);
        const momentCurrentDate = moment(new Date());
        let days = momentDate.diff(momentCurrentDate, 'days');
        let hoursDifference = momentDate.diff(momentCurrentDate, 'hours');
        let minutesDifference = momentDate.diff(momentCurrentDate, 'minutes');
        let secondsDifference = momentDate.diff(momentCurrentDate, 'seconds');
        let showCountdown = false;
        let countDownMinutes = 0;
        let countDownSeconds = 0;
        let countDownHours = 0;

        if (secondsDifference <= 86400) {
          showCountdown = true;
        }

        countDownHours = hoursDifference;
        countDownMinutes = minutesDifference - (hoursDifference * 60);
        countDownSeconds = secondsDifference - (minutesDifference * 60);

        this.setState({
          ...this.state,
          eventDate: formattedDate,
          showCountdown,
          countdown: {
            days,
            hours: countDownHours,
            minutes: countDownMinutes,
            seconds: countDownSeconds
          }
        });

        if (secondsDifference <= 0) {
          clearInterval(this.interval);
          onChange();
        }

      };

      runCountDownCheck(slide.date_dt);
      this.interval = setInterval(() => {
        runCountDownCheck(slide.date_dt);
      }, 1000);

    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { model, index, fieldId, hero, slide } = this.props;
    const { eventDate, showCountdown, countdown } = this.state;

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
                style={{ backgroundImage: `url(${slide.background_s})` }}
              >
              </div>
            </div>
            <div
              className="image discover-slider__inner--background discover-slider__inner--background-desktop"
            >
              <div
                className="image__image"
                style={{ backgroundImage: `url(${slide.background_s})` }}
              >
              </div>
            </div>
          </div>
          <div
            className={`discover-slider__inner--content ${(hero && slide.date_dt ? 'hero_content' : '')}`}
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
              style={{ backgroundImage: `url(${slide.logo_s})` }}
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

            {this.props.hero && eventDate &&
            <div className="hero__countdown">
              <div className="countdown-container__content" id="countdown">
                <div className="countdown--pre countdown--text">
                  <div className="countdown__label">Upcoming</div>
                  {
                    showCountdown ?
                      (
                        <div className="countdown__heading">
                          {twoDigitNumber(countdown.hours, true)}{twoDigitNumber(countdown.minutes, true)}{twoDigitNumber(countdown.seconds, false)}
                        </div>
                      ) : (
                        <>
                          <div
                            className="countdown__heading"
                          >{eventDate.month} {eventDate.monthDay}</div>
                          <div className="countdown__live-time">Live
                            at {eventDate.time} {eventDate.timezone}</div>
                        </>
                      )
                  }
                </div>
              </div>
            </div>
            }
          </div>
        </Field>
      </div>
    );
  }
}

export default Slide;
