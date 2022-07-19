import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNullOrUndefined } from 'util';
import { getDescriptor } from '@craftercms/redux';

import { setVideoDocked } from '../../actions/videoPlayerActions';
import { setHeaderGhost } from '../../actions/headerActions';
import Hero from '../../components/Hero/Hero.js';
import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import NotFound from '../Errors/404';
import { parseDescriptor } from '@craftercms/content';
import { isAuthoring } from '../../components/utils';
import { ExperienceBuilder } from '@craftercms/experience-builder/react';

class Channel extends Component {
  constructor(props) {
    super(props);

    //categories = new/featured, all videos, all streams, related

    this.getChannelInfo(props);
  }

  componentWillMount() {
    this.props.setVideoDocked(false);
  }

  componentDidMount() {
    this.props.setHeaderGhost(true);
  }

  componentWillUnmount() {
    this.props.setHeaderGhost(false);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.url !== newProps.match.url) {
      this.getChannelInfo(newProps);
    }
  }

  getChannelInfo(props) {
    var channelName = props.match.params.name;

    this.descriptorUrl = `/site/components/channel/${channelName}.xml`;

    if (isNullOrUndefined(this.props.descriptors[this.descriptorUrl])) {
      this.props.getDescriptor(this.descriptorUrl);
    }
  }

  renderChannelContent(descriptor) {
    var component = descriptor.component,
      channelContent = descriptor.component,
      model = parseDescriptor(channelContent),
      categories;

    const channelHeroData = {
      background: {
        value: channelContent.heroImage_s,
        fieldId: 'heroImage_s'
      },
      title: {
        value: channelContent['internal-name'],
        fieldId: 'internal-name'
      },
      subtitle: {
        value: channelContent.description_s,
        fieldId: 'description_s'
      }
    };

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
                    },
                    {
                      'match': {
                        'content-type': '/component/stream'
                      }
                    }
                  ]
                }
              },
              {
                'match': {
                  'channels_o.item.key': channelContent.channelKey_s
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
        sort: {
          by: 'date_dt',
          order: 'desc'
        },
        numResults: component.maxVideosDisplay_i,
        viewAll: channelContent.channelKey_s
      },
      {
        key: 'related-channels',
        value: 'Related Channels',
        type: 'channel-card-alt',   //TO RENDER CHANNEL CARD STYLING
        query: {
          'bool': {
            'must_not': {
              'term': { 'file-name': channelContent['file-name'] }
            },
            'filter': [
              {
                'match': {
                  'content-type': '/component/component-channel'
                }
              }
            ]
          }
        },
        numResults: component.maxChannelsDisplay_i
      }
    ];

    return (
      <ExperienceBuilder
        isAuthoring={isAuthoring()}
        path={this.descriptorUrl}
      >
        <Hero
          model={model}
          data={channelHeroData}
          localData={true}
        >
        </Hero>
        <VideoCategories
          categories={categories}
        >
        </VideoCategories>
      </ExperienceBuilder>
    );
  }

  render() {
    const { descriptors, descriptorsLoading } = this.props;

    if ((descriptorsLoading[this.descriptorUrl] === false) && isNullOrUndefined(descriptors[this.descriptorUrl])) {
      return (
        <NotFound />
      );
    } else {
      return (
        <div>
          {descriptors && descriptors[this.descriptorUrl] &&
          this.renderChannelContent(descriptors[this.descriptorUrl])
          }
        </div>
      );
    }
  }
}

function mapStateToProps(store) {
  return {
    videoInfo: store.video.videoInfo,
    videoStatus: store.video.videoStatus,
    descriptors: store.craftercms.descriptors.entries,
    descriptorsLoading: store.craftercms.descriptors.loading
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

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
