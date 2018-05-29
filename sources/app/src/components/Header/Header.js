import React, { Component } from "react";
import { Link } from 'react-router-dom';
import HeaderHolder from './HeaderStyle';
import HeaderSearch from './HeaderSearch';
import 'font-awesome/css/font-awesome.min.css';

import { connect } from "react-redux";

import logo from '../../images/logo.png';

class Header extends Component {

    //TODO: Right now is only one level deep - Should it be more than one level?
    renderNavItems() {
        return this.props.nav.subItems.map((navItem, i) => {
            return (
                <li key={ i } className="navigation__item">
                    <Link className="navigation__link navigation__link--apps" to={ navItem.url }>
                        <span className="navigation__link--text">
                            { navItem.label }
                        </span>
                    </Link>
                </li>
            );
        });
    }
 
    render() {
        const { nav, ghost } = this.props;

        return (
            <HeaderHolder>
                <header id="mainHeader" className={"header"}>
                    <div className="header__container">
                        <div className="header__overlay"></div>
        
                        <Link className="header__logo active" to="/" style={{ backgroundImage: `url(${ logo })` }}>
                            Video Center
                        </Link>
                        <div className="header__navigation">
                            <nav className="navigation">
                                <ul className="navigation__list">
                                    {/* <li className="navigation__item">
                                        <Link className="navigation__link navigation__link--apps" to="/channels">
                                            <span className="navigation__link--text">
                                                Channels
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="navigation__item">
                                        <a className="navigation__link navigation__link--tv" href="/tv">
                                            <span className="navigation__link--text">
                                                TV
                                            </span>
                                        </a>
                                    </li>
                                    <li className="navigation__item">
                                        <Link className="navigation__link navigation__link--apps" to="/live-events">
                                            <span className="navigation__link--text">
                                                Live Events
                                            </span>
                                        </Link>
                                    </li> */}
                                    { this.props.nav && this.renderNavItems() }
                                </ul>
                            </nav>
                        </div>
                        <div className="header__search">
                            <div>
                                <HeaderSearch />
                            </div>
                        </div>
                    </div>
                </header>
            </HeaderHolder>
        );
    }
}

function mapStateToProps(store) {
    return { nav: store.nav.nav };
}

export default connect(mapStateToProps)(Header);