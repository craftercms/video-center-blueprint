import React, { Component } from "react";
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from './containers/Home/Home.js';
import Video from './containers/Video/Video.js';
import Channels from './containers/Channels/Channels.js';
import Channel from './containers/Channel/Channel.js';
import LiveEvents from './containers/LiveEvents/LiveEvents.js';
import Search from './containers/Search/Search.js';

import { connect } from "react-redux";
import { getNav } from "./actions/navigationActions";

// The Main component renders one of the provided Routes 
class Router extends Component {
    componentWillMount() {
        //Need to locally set components in order to dinamically load them in router
        this.Channels = Channels;

        this.props.dispatch(getNav())
    }
 
    render() {
        const { nav } = this.props,
              me = this;

        return (
        <Switch>
            <Route exact path='/' component={Home}/>
            {/* <Route exact path='/channels' component={Channels}/> */}
            <Route exact path='/live-events' component={LiveEvents}/>
            <Route exact path='/video/:id' component={Video}/>
            <Route exact path='/stream/:id' component={Video}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/search/:query' component={Search}/>
            <Route exact path='/channel/:name' component={Channel}/>
            { nav &&
                nav.subItems.map((entry, i) => (
                    <Route key={ i }  exact path={entry.url} component={ me[entry.attributes.reactComponent] }/>
                ))
            }
        </Switch>
        );
    }
}

function mapStateToProps(store) {
    return { nav: store.nav.nav };
}

export default withRouter(connect(mapStateToProps)(Router));
