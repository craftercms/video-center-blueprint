import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNav } from '@craftercms/redux';

import Video from './containers/Video/Video.js';
import Channel from './containers/Channel/Channel.js';
import List from './containers/List/List.js';
import ErrorPage from './containers/Errors/errorPage';
import DynamicRoute from './components/DynamicRoute';

// The Main component renders one of the provided Routes
class Router extends Component {
  componentWillMount() {
    this.props.getNav('/site/website');
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={DynamicRoute} />
        <Route exact path='/video/:id/:videoName?' component={Video} />
        <Route exact path='/stream/:id/:videoName?' component={Video} />
        <Route exact path='/search' component={DynamicRoute} />
        <Route exact path='/search/:query' component={DynamicRoute} />
        <Route exact path='/channel/:name' component={Channel} />
        <Route exact path='/list/:id' component={List} />
        <Route exact path='/list/:categoryName/:query/:sort?' component={List} />

        <Route exact path='/channels' component={DynamicRoute} />
        <Route exact path='/live-events' component={DynamicRoute} />
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

function mapStateToProps(store) {
  return { nav: store.craftercms.navigation };
}

function mapDispatchToProps(dispatch) {
  return ({
    getNav: (url) => {
      dispatch(getNav(url));
    }
  });
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Router));
