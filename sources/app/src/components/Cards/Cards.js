import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import { isNullOrUndefined } from 'util';

import { crafterConf } from '@craftercms/classes';
import { SearchService } from '@craftercms/search';

import { formatDate } from '../../utils';

class Cards extends Component {
  componentDidMount() {
    this.searchCards(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.searchCards(newProps);
  }

  searchCards(props) {
    const self = this;

    var query = SearchService.createQuery('elasticsearch'),
      category = props.category;

    if (category.query) {
      var queryObj = {
        'query': category.query
      };

      if (!isNullOrUndefined(category.numResults)) {
        queryObj.size = category.numResults;
      }

      if (!isNullOrUndefined(category.sort)) {
        queryObj.sort = [{
          [category.sort.by]: {
            ...(
              category.sort.unmapped_type
                ? {"unmapped_type" : category.sort.unmapped_type}
                : {}
            )
            ,
            "order": category.sort.order
          }
        }];
      }

      query.query = queryObj;
    } else {
      let sort = {};
      if (!isNullOrUndefined(category.sort)) {
        sort = {
          [category.sort.by]: category.sort.order
        };
      }
      category = props.category.key;
      query.query = {
        'query': {
          'bool': {
            'filter': [
              {
                'bool': {
                  'should': [
                    // matches 'youtube-video' or 'video-on-demand'
                    {
                      'match': {
                        'content-type': '/component/youtube-video'
                      }
                    },
                    {
                      'match': {
                        'content-type': '/component/video-on-demand'
                      }
                    },
                    // or matches 'stream' and active
                    {
                      'bool': {
                        'filter': [
                          {
                            'match': {
                              'content-type': '/component/stream',
                            }
                          },
                          {
                            'range': {
                              'startDate_dt': {
                                'lt': 'now'
                              }
                            }
                          },
                          {
                            'range': {
                              'endDate_dt': {
                                'gt': 'now'
                              }
                            }
                          }
                        ]
                      }
                    },
                    // or matches 'stream' and upcoming
                    {
                      'bool': {
                        'filter': [
                          {
                            'match': {
                              'content-type': '/component/stream',
                            }
                          },
                          {
                            'range': {
                              'startDate_dt': {
                                'gt': 'now'
                              }
                            }
                          }
                        ]
                      }
                    },
                  ]
                }
              },
              {
                'match': {
                  'channels_o.item.key': category
                }
              }
            ]
          },
        },
        'sort': sort
      };
    }

    SearchService
      .search(query, crafterConf.getConfig())
      .subscribe(response => {
        self.setState({ hits: response.hits });
      });
  }

  renderCards() {
    const { category } = this.props;

    return this.state.hits.map((hit) => {
      var card = hit._source,
        componentUrl = card['content-type'] === '/component/stream' ? '/stream/' : '/video/',
        categoryType = this.props.category.type ? this.props.category.type : 'video-card';

      switch (categoryType) {
        case 'video-card':

          if (card.startDate_dt) {
            var
              videoStartDate = new Date(card.startDate_dt),
              now = new Date(),
              formattedDate = formatDate(card.startDate_dt);
          }

          return (
            <div className="static-grid__item" key={hit._id}>
              <div className="video-card video-card--has-description">
                <Link className="video-card__link" to={`${componentUrl}${card.objectId}`}>
                  <div>
                    <div
                      className="image video-card__image--background"
                      style={{ background: 'transparent' }}
                    >
                      <div
                        className="image__image"
                        style={{ backgroundImage: `url(${card.thumbnail_s})` }}
                      />
                    </div>
                    <video
                      className="image preview-video" loop="" preload="auto"
                      playsInline=""
                    />
                  </div>
                  {videoStartDate > now &&
                  <div className="video-card__date-info">
                    <div className="day">
                      {formattedDate.month} {formattedDate.monthDay}
                    </div>
                    <div className="time">
                      {formattedDate.weekDay} @ {formattedDate.time} {formattedDate.timezone}
                    </div>
                  </div>
                  }
                  <div className="video-card__content">
                    <div className="video-card__time"> {card.length} </div>
                    <h3
                      className="heading video-card__heading heading--default heading--card"
                    >{card.title_s}</h3>
                    <div className="video-card__description"> {card.summary_s} </div>
                    <div
                      className="video-card__long-description"
                    > {ReactHtmlParser(card.description_html)} </div>
                    <div className="video-card__progress" style={{ width: '0%' }}></div>
                  </div>
                  <div className="video-card__play-button">
                    <FontAwesomeIcon className="play-icon" icon={faPlay} />
                  </div>
                </Link>
              </div>
            </div>
          );
        case 'channel-card-alt':
          var url = card['file-name'].replace('.xml', '');

          return (
            <div className="static-grid__item" key={hit._id}>
              <div className="channel-card-alt">
                <Link className="channel-card-alt__link" to={`/channel/${url}`}>
                  <div className="image channel-card-alt__image">
                    <div
                      className="image__image"
                      style={{ backgroundImage: `url(${card.thumbnailImage_s})` }}
                    >
                      <div className="channel-card-alt__overlay"></div>
                    </div>
                  </div>
                  <h2 className="channel-card-alt__heading"> {card['internal-name']} </h2>
                </Link>
              </div>
            </div>
          );
        case 'standard-card':
          return (
            <div className="static-grid__item" key={hit._id} />
          );
        case 'live-event-item':
          var dateFormatted = formatDate(card.startDate_dt);

          return (
            <div className="live-events-item" key={hit._id}>
              <CardContainer card={card} category={category}>
                <div className="live-events-item__image">
                  <div className="live-events-item__background">
                    <div className="image">
                      <div
                        className="image__image"
                        style={{ backgroundImage: `url("${card.thumbnail_s}")` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="live-events-item__content">
                  <div className="live-events-item__date">
                    <h2
                      className="heading heading--default"
                    >{dateFormatted.month} {dateFormatted.monthDay}</h2>
                    <h3 className="heading heading--year">, {dateFormatted.year}</h3>
                  </div>
                  <div
                    className="live-events-item__time"
                  >{dateFormatted.weekDay} @ {dateFormatted.time} {dateFormatted.timezone}</div>
                  <div className="live-events-item__detail">
                    <div className="live-events-item__heading-group">
                      <h3 className="live-events-item__heading">{card.title_s}</h3>
                    </div>
                  </div>
                </div>
              </CardContainer>
            </div>
          );
        default:
          return (
            <div></div>
          );
      }
    });
  }

  render() {
    return (
      <div className={this.props.category.type !== 'live-event-item' ? 'static-grid__items' : ''}>
        {this.state && this.state.hits &&
        this.renderCards()
        }
        {this.state && this.state.hits && this.state.hits.length === 0 &&
        <div className="segment">
          <div
            style={{
              textAlign: 'center',
              fontSize: '3rem',
              fontWeight: '700',
              padding: '15rem 0px 25rem',
              minHeight: '50vh'
            }}
          >
            No results
          </div>
        </div>
        }
      </div>
    );
  }
}

class CardContainer extends Component {
  render() {
    const { category, card, children } = this.props;
    let videoName = card.title_s ? (card.title_s).toLowerCase().replace(/ /g, '-') : '';
    videoName = encodeURIComponent(videoName);

    return category.noLinks ? (
      <div className="live-events-item__link">
        {children}
      </div>
    ) : (
      <Link className="live-events-item__link" to={`/stream/${card.objectId}/${videoName}`}>
        {children}
      </Link>
    );
  }
}

export default Cards;
