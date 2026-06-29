import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNullOrUndefined } from '../../utils';
import { getItem } from '@craftercms/redux';
import { setVideoDocked } from '../../actions/videoPlayerActions';
import { setHeaderGhost } from '../../actions/headerActions';
import Slider from '../../components/Slider/Slider.jsx';
import VideoCategories from '../../components/VideoCategories/VideoCategories.jsx';
import { parseDescriptor } from "@craftercms/content";

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.setVideoDocked(false);

    this.descriptorUrl = '/site/website/index.xml';

    if (isNullOrUndefined(this.props.items[this.descriptorUrl])) {
      this.props.getItem(this.descriptorUrl);
    }
  }

  componentDidMount() {
    this.props.setHeaderGhost(true);
  }

  componentWillUnmount() {
    this.props.setHeaderGhost(false);
  }

  renderSlider(item) {
    if (item.slider_o) {
      return (
        <Slider
          data={item.slider_o}
          getItem={this.props.getItem}
          items={this.props.items}
        >
        </Slider>
      );
    }
  }

  renderHomeContent(item) {
    var categories = [
        {
          key: 'featured-videos',
          value: 'Featured Videos',
          query: {
            'bool': {
              'filter': [
                {
                  'bool': {
                    'should': [
                      {
                        'match': {
                          'content-type': '/component/youtube-video'
                        }
                      },
                      {
                        'match': {
                          'content-type': '/component/video-on-demand'
                        }
                      }
                    ],
                  }
                },
                {
                  'match': {
                    'featured_b': true
                  }
                }
              ]
            }
          },
          numResults: item.maxVideosDisplay_i
        },
        {
          key: 'latest-videos',
          value: 'Latest Videos',
          query: {
            'bool': {
              'filter': [
                {
                  'bool': {
                    'should': [
                      {
                        'match': {
                          'content-type': '/component/youtube-video'
                        }
                      },
                      {
                        'match': {
                          'content-type': '/component/video-on-demand'
                        }
                      }
                    ]
                  }
                }
              ]
            },
          },
          sort: {
            by: 'date_dt',
            order: 'desc'
          },
          numResults: item.maxVideosDisplay_i
        },
        {
          key: 'featured-channels',
          value: 'Featured Channels',
          type: 'channel-card-alt',
          query: {
            'bool': {
              'filter': [
                {
                  'match': {
                    'content-type': '/component/component-channel'
                  }
                },
                {
                  'match': {
                    'featured_b': true
                  }
                }
              ]
            }
          },
          numResults: item.maxChannelsDisplay_i
        }
      ];

    return (
      <div>
        {this.renderSlider(item)}

        <VideoCategories categories={categories}>
        </VideoCategories>
      </div>
    );
  }

  render() {
    var { items } = this.props;

    return (
      <div>
        {items?.[this.descriptorUrl] &&
          this.renderHomeContent(parseDescriptor(items[this.descriptorUrl]))
        }
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    videoStatus: store.video.videoStatus,
    items: store.craftercms.items.entries,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    setVideoDocked: (docked) => {
      dispatch(setVideoDocked(docked));
    },
    getItem: (url) => dispatch(getItem({url, config: { flatten: true }})),
    setHeaderGhost: (ghost) => {
      dispatch(setHeaderGhost(ghost));
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
