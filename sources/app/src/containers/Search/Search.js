import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import SearchHolder from './SearchStyle';
import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import { setVideoDocked } from '../../actions/videoPlayerActions';
import { isNullOrUndefined } from 'util';

const WAIT_INTERVAL = 1000;

class Search extends Component {

  constructor(props) {
    super(props);

    this.searchId = this.props.match.params.query;

    this.state = {
      categories: this.setCategories(this.searchId)
    };

  }

  componentWillMount() {
    this.props.setVideoDocked(false);
    this.timer = null;
  }

  componentDidMount() {
    this.appContentEl = document.getElementById('app-content');
    this.appContentEl.classList.add('search-content');
  }

  componentWillUnmount() {
    this.appContentEl.classList.remove('search-content');
  }

  componentWillReceiveProps(newProps) {
    let value = newProps.match.params.query,
      newCategories = this.setCategories(value);

    this.searchInput.value = value ?? '';
    this.setState({ categories: newCategories });
  }

  setCategories(searchId) {
    const searchKeyword = isNullOrUndefined(searchId) ? '' : searchId,
      searchFilter = searchKeyword.replace(/\s/g, '') === ''
        ? {
          'regexp': {
            'title_t': `.*${searchKeyword}.*`
          }
        } : {
          'match_phrase_prefix': {
            'title_t': searchKeyword
          }
        };


    return [
      {
        key: 'top-results',
        value: 'Top Results',
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
                'bool': {
                  'should': [
                    {
                      'regexp': {
                        'tags_o.item.value_smv': `.*${searchKeyword}.*`
                      }
                    },
                    searchFilter
                  ]
                }
              }
            ]
          }
        },
        viewAll: false,
        numResults: 90
      }];
  }

  onChange(event) {
    var me = this,
      value = event.target.value;

    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      var newCategories = me.setCategories(value);

      me.setState({ categories: newCategories });
    }, WAIT_INTERVAL);

  }

  render() {
    return (
      <SearchHolder>
        <div className="search-bar--sticky">
          <div className="search-bar search-bar--visible">
            <div className="search-bar__container">
              <div className="search-bar__inner">
                <div className="search-bar__icon">
                  <FontAwesomeIcon className="search__icon" icon={faSearch} />
                </div>
                <input
                  type="text" className="search-bar__input" placeholder="Start Typing..."
                  ref={r => this.searchInput = r}
                  defaultValue={this.searchId}
                  onChange={this.onChange.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>

        <VideoCategories categories={this.state.categories} />
      </SearchHolder>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
