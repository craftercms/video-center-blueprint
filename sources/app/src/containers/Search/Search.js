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
    let searchKeyword = isNullOrUndefined(searchId) ? '' : searchId;

    const fields = ['title_t^1.5', 'description_html^1', 'tags_o.item.value_smv^1'];
    let query = {};
    query.filter = [
      {
        'terms': {
          'content-type': ['/component/youtube-video', '/component/video-on-demand', '/component/stream']
        }
      }
    ];

    // Check if the user is requesting an exact match with quotes
    const regex = /.*("([^"]+)").*/;
    const matcher = searchKeyword.match(regex);

    if (matcher) {
      // Using must excludes any doc that doesn't match with the input from the user
      query.must = [
        {
          'multi_match': {
            'query': matcher[2],
            'fields': fields,
            'fuzzy_transpositions': false,
            'auto_generate_synonyms_phrase_query': false
          }
        }
      ];

      // Remove the exact match to continue processing the user input
      searchKeyword = searchKeyword.replace(matcher[1], '');
    } else {
      query.minimum_should_match = 1;
    }

    if (searchKeyword) {
      // Using should makes it optional and each additional match will increase the score of the doc
      query.should = [
        {
          'multi_match': {
            'query': searchKeyword,
            'fields': fields,
            'type': 'phrase_prefix',
            'boost': 1.5
          }
        },
        {
          'multi_match': {
            'query': searchKeyword,
            'fields': fields
          }
        }
      ]
    }

    return [
      {
        key: 'top-results',
        value: 'Top Results',
        query: {
          'bool': query
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
