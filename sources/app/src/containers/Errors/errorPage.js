import React, { Component } from "react";

import NotFound from './404';

class ErrorPage extends Component {
    componentDidMount() {
        document.getElementById("mainHeader").classList.add("header--ghost");
    }
    componentWillUnmount() {
        document.getElementById("mainHeader").classList.remove("header--ghost");
    }

    render() {
        return (
            <div>
                <NotFound/>
            </div>
        );
    }
}


export default ErrorPage;
