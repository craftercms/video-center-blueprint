import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ExperienceBuilder } from '@craftercms/experience-builder/react';

import { setVideoDocked } from '../../actions/videoPlayerActions';
import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import { isAuthoring } from '../../components/utils';

class Channel extends Component {
  componentWillMount() {
    this.props.setVideoDocked(false);
  }

  componentDidMount() {
    this.getInfo(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.getInfo(newProps);
    }
  }

  getInfo(props) {
    var params = props.match.params,
      category = {
        key: '',
        value: params.categoryName,
        viewAll: false,
        withPagination: true
      },
      query;

    try {
      query = JSON.parse(params.query.replace(/__/g, '/'));
    } catch (e) {
      query = params.query.replace(/__/g, '/').split(',');
    }


    if (query[0] === 'featured' || query[0] === 'all') {
      const allVideosQuery = {
        bool: {
          filter: [
            {
              bool: {
                should: [
                  {
                    match: { "content-type": "/component/youtube-video" }
                  },
                  {
                    match: { "content-type": "/component/video-on-demand" }
                  }
                ]
              }
            }
          ]
        }
      };

      if (query[0] === 'featured') {
        allVideosQuery.bool.filter.push({
          match: {
            featured_b: true
          }
        });
      }

      category.query = allVideosQuery;
    } else {
      category.key = query[0];
    }

    if (params.sort) {
      category.sort = JSON.parse(params.sort);
    }

    this.setState({
      categories: [
        category
      ]
    });
  }

  render() {
    return (
      <ExperienceBuilder
        isAuthoring={isAuthoring()}
        path="/site/website/index.xml"
      >
        {this.state && this.state.categories &&
          <VideoCategories categories={this.state.categories} />
        }
      </ExperienceBuilder>
    );
  }
}

function mapStateToProps(store) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return ({
    setVideoDocked: (docked) => {
      dispatch(setVideoDocked(docked));
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
