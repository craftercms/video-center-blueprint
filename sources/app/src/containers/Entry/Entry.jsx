import React, { Component } from 'react';
import Channels from '../Channels/Channels';
import LiveEvents from '../LiveEvents/LiveEvents';
import Search from '../Search/Search';

class Entry extends Component {
  render() {
    switch (this.props.match.path) {
      case '/channels':
        return <Channels { ...this.props } />;
      case '/live-events':
        return <LiveEvents { ...this.props } />;
      case '/search':
      case '/search/:query':
        return <Search {...this.props } />;
      default:
        return <></>;
    }
  }
}

export default Entry;
