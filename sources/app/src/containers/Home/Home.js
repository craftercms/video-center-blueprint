import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNullOrUndefined } from 'util';
import { getDescriptor } from '@craftercms/redux';
import { setVideoDocked } from '../../actions/videoPlayerActions';
import { setHeaderGhost } from '../../actions/headerActions';
import Slider from '../../components/Slider/Slider.js';
import VideoCategories from '../../components/VideoCategories/VideoCategories.js';

class Home extends Component {
  componentWillMount() {
    this.props.setVideoDocked(false);

    this.descriptorUrl = '/site/website/index.xml';

    if (isNullOrUndefined(this.props.descriptors[this.descriptorUrl])) {
      this.props.getDescriptor(this.descriptorUrl);
    }
  }

  componentDidMount() {
    this.props.setHeaderGhost(true);
  }

  componentWillUnmount() {
    this.props.setHeaderGhost(false);
  }

  renderSlider(descriptor) {
    if (descriptor.page.slider_o.item) {
      return (
        <Slider
          data={descriptor.page.slider_o.item}
          getDescriptor={this.props.getDescriptor}
          descriptors={this.props.descriptors}
        >
        </Slider>
      );
    }
  }

  renderHomeContent(descriptor) {
    var page = descriptor.page,
      categories = [
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
          numResults: page.maxVideosDisplay_i
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
          numResults: page.maxVideosDisplay_i
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
          numResults: page.maxChannelsDisplay_i
        }
      ];

    return (
      <div>
        {this.renderSlider(descriptor)}

        <VideoCategories categories={categories}>
        </VideoCategories>
      </div>
    );
  }

  render() {
    var { descriptors } = this.props;

    return (
      <div>
        {descriptors && descriptors[this.descriptorUrl] &&
        this.renderHomeContent(descriptors[this.descriptorUrl])
        }
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    videoStatus: store.video.videoStatus,
    descriptors: store.craftercms.descriptors.entries
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    setVideoDocked: (docked) => {
      dispatch(setVideoDocked(docked));
    },
    getDescriptor: (url) => {
      dispatch(getDescriptor(url));
    },
    setHeaderGhost: (ghost) => {
      dispatch(setHeaderGhost(ghost));
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
