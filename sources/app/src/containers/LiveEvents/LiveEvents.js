import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import { setVideoDocked } from '../../actions/videoPlayerActions';

class LiveEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: this.props.match.params.query,
      categories: [
        {
          key: 'active-events',
          value: 'Active Events',
          type: 'live-event-item',
          query: {
            'bool': {
              'filter': [
                {
                  'match': {
                    'content-type': '/component/stream'
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
          sort: {
            by: 'startDate_dt',
            order: 'asc',
            unmapped_type: 'date'
          },
          numResults: 6
        },
        {
          key: 'upcoming-events',
          value: 'Upcoming Events',
          type: 'live-event-item',
          query: {
            'bool': {
              'filter': [
                {
                  'match': {
                    'content-type': '/component/stream'
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
          sort: {
            by: 'startDate_dt',
            order: 'asc',
            unmapped_type: 'date'
          },
          numResults: 6
        },
        {
          key: 'past-events',
          value: 'Past Events',
          type: 'live-event-item',
          noLinks: true,
          query: {
            'bool': {
              'filter': [
                {
                  'match': {
                    'content-type': '/component/stream'
                  }
                },
                {
                  'range': {
                    'endDate_dt': {
                      'lt': 'now'
                    }
                  }
                }
              ]
            }
          },
          sort: {
            by: 'endDate_dt',
            order: 'desc',
            unmapped_type: 'date'
          },
          numResults: 6
        }
      ]
    };
  }

  componentWillMount() {
    this.props.setVideoDocked(false);
  }

  render() {
    return (
      <div>
        <VideoCategories
          categories={this.state.categories}
        >
        </VideoCategories>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    videoInfo: store.video.videoInfo,
    videoStatus: store.video.videoStatus
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    setVideoDocked: (docked) => {
      dispatch(setVideoDocked(docked));
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveEvents);
