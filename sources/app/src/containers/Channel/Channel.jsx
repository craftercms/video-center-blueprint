import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNullOrUndefined } from '../../utils';
import { getItem } from '@craftercms/redux';

import { setVideoDocked } from '../../actions/videoPlayerActions';
import { setHeaderGhost } from '../../actions/headerActions';
import Hero from '../../components/Hero/Hero.jsx';
import VideoCategories from '../../components/VideoCategories/VideoCategories.jsx';
import NotFound from '../Errors/404';
import { parseDescriptor } from '@craftercms/content';
import { isAuthoring } from '../../components/utils';
import { ExperienceBuilder } from '@craftercms/experience-builder/react';

class Channel extends Component {
  constructor(props) {
    super(props);
    this.props.setVideoDocked(false);
    //categories = new/featured, all videos, all streams, related
    this.getChannelInfo(props);
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

    if (isNullOrUndefined(this.props.items[this.descriptorUrl])) {
      this.props.getItem(this.descriptorUrl);
    }
  }

  renderChannelContent(item) {
    var channelContent = item,
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
        numResults: channelContent.maxVideosDisplay_i,
        viewAll: channelContent.channelKey_s
      },
      {
        key: 'related-channels',
        value: 'Related Channels',
        type: 'channel-card-alt',   //TO RENDER CHANNEL CARD STYLING
        query: {
          'bool': {
            'must_not': {
              'term': { 'file-name': channelContent.craftercms.fileName }
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
        numResults: channelContent.maxChannelsDisplay_i
      }
    ];

    return (
      <ExperienceBuilder
        isAuthoring={isAuthoring()}
        path={this.descriptorUrl}
      >
        <Hero
          model={channelContent}
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
    const { items, itemsLoading } = this.props;

    if ((itemsLoading[this.descriptorUrl] === false) && isNullOrUndefined(items[this.descriptorUrl])) {
      return (
        <NotFound />
      );
    } else {
      return (
        <div>
          {items?.[this.descriptorUrl] &&
          this.renderChannelContent(parseDescriptor(items[this.descriptorUrl]))
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
    items: store.craftercms.items.entries,
    itemsLoading: store.craftercms.items.loading
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

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
