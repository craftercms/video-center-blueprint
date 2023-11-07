import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import { crafterConf } from '@craftercms/classes';
import { SearchService } from '@craftercms/search';
import { parseDescriptor } from '@craftercms/content';
import { Field } from '@craftercms/experience-builder/react';

import { formatDate, nou, defaultSearchQuery } from '../../utils';

import { Pagination, PAGINATION_DEFAULT_PAGE_SIZE } from '../Pagination/Pagination';

class Cards extends Component {
  componentDidMount() {
    this.searchCards(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.searchCards(newProps);
  }

  searchCards(props) {
    const { category } = props;
    if (!category) {
      return;
    }

    const from = 0;
    let size;
    if (category.withPagination) {
      size = PAGINATION_DEFAULT_PAGE_SIZE;
    } else if (!nou(category.numResults)) {
      size = category.numResults;
    }

    this.searchWithSize(category, from, size);
  }

  searchWithSize(category, from = 0, size) {
    const queryBuilder = SearchService.createQuery();

    if (category.query) {
      const queryObj = {
        'query': category.query
      };

      queryObj.from = from;

      queryObj.size = size;

      if (!nou(category.sort)) {
        queryObj.sort = {
          [category.sort.by]: category.sort.order
        };
      }

      queryBuilder.query = queryObj;
    } else {
      queryBuilder.query = defaultSearchQuery(category, from, size);
    }

    SearchService
      .search(queryBuilder, crafterConf.getConfig())
      .subscribe(response => {
        this.setState({ hits: response.hits, total: response.total?.value });
      });
  }

  renderCards() {
    const { category } = this.props;

    return this.state.hits.map((hit) => {
      var card = hit._source,
        componentUrl = card['content-type'] === '/component/stream' ? '/stream/' : '/video/',
        categoryType = this.props.category.type ? this.props.category.type : 'video-card';
      const model = parseDescriptor(card);
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
                <Field component={Link} model={model} className="video-card__link" to={`${componentUrl}${card.objectId}`}>
                  <div>
                    <div
                      className="image video-card__image--background"
                      style={{ background: 'transparent' }}
                    >
                      <div
                        className="image__image"
                        style={{ backgroundImage: `url("${card.thumbnail_s}")` }}
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
                </Field>
              </div>
            </div>
          );
        case 'channel-card-alt':
          var url = card['file-name'].replace('.xml', '');

          return (
            <div className="static-grid__item" key={hit._id}>
              <div className="channel-card-alt">
                <Field component={Link} model={model} className="channel-card-alt__link" to={`/channel/${url}`}>
                  <div className="image channel-card-alt__image">
                    <div
                      className="image__image"
                      style={{ backgroundImage: `url("${card.thumbnailImage_s}")` }}
                    >
                      <div className="channel-card-alt__overlay"></div>
                    </div>
                  </div>
                  <h2 className="channel-card-alt__heading"> {card['internal-name']} </h2>
                </Field>
              </div>
            </div>
          );
        case 'standard-card':
          return (
            <Field model={model} className="static-grid__item" key={hit._id} />
          );
        case 'live-event-item':
          var dateFormatted = formatDate(card.startDate_dt);

          return (
            <div className="live-events-item" key={hit._id}>
              <CardContainer model={model} card={card} category={category}>
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
      <>
        <div className={this.props.category.type !== 'live-event-item' ? 'static-grid__items' : ''}>
          { this.state && this.state.hits &&
            this.renderCards()
          }
          { this.state && this.state.hits && this.state.hits.length === 0 &&
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
        { this.props.category?.withPagination && this.state?.total > 0 &&
          <Pagination
            total={this.state.total}
            onChange={(page, pageSize) => {
              const fromIndex = pageSize * (page - 1);
              this.searchWithSize(this.props.category, fromIndex, pageSize);
            }}
            onShowSizeChange={(current, pageSize) => {
              const fromIndex = pageSize * (current - 1);
              this.searchWithSize(this.props.category, fromIndex, pageSize);
            }}
          />
        }
      </>
    );
  }
}

class CardContainer extends Component {
  render() {
    const { model, category, card, children } = this.props;
    let videoName = card.title_s ? (card.title_s).toLowerCase().replace(/ /g, '-') : '';
    videoName = encodeURIComponent(videoName);

    return category.noLinks ? (
      <Field model={model} className="live-events-item__link">
        {children}
      </Field>
    ) : (
      <Field component={Link} model={model} className="live-events-item__link" to={`/stream/${card.objectId}/${videoName}`}>
        {children}
      </Field>
    );
  }
}

export default Cards;
