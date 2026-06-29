import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getItem } from '@craftercms/redux';
import { parseDescriptor } from '@craftercms/content';
import { isNullOrUndefined } from '../../utils';

import HeaderHolder from './HeaderStyle';
import HeaderSearch from './HeaderSearch';

class Header extends Component {
  constructor(props) {
    super(props);

    this.levelDescriptorUrl = '/site/website/crafter-level-descriptor.level.xml';

    if (isNullOrUndefined(props.items[this.levelDescriptorUrl])) {
      this.props.getItem(this.levelDescriptorUrl);
    }
  }

  renderNavItems() {
    var rootId = '/';

    return this.props.nav.childIds[rootId].map((id, i) => {
      var navItem = this.props.nav.entries[id];

      return (
        <li key={i} className="navigation__item">
          <Link className="navigation__link navigation__link--apps" to={navItem.url}>
            <span className="navigation__link--text">
              {navItem.label}
            </span>
          </Link>
        </li>
      );
    });
  }

  renderHeaderLogo(item) {
    const logo = item.siteLogo;

    return (
      <Link
        className="header__logo active" to="/"
        style={{ backgroundImage: `url("${logo}")` }}
      />
    );
  }

  render() {
    const { nav, items } = this.props;
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    return (
      <HeaderHolder>
        <header
          id="mainHeader"
          className={'header ' + (this.props.headerGhost ? 'header--ghost ' : ' ') + (iOS ? 'ios' : '')}
        >
          <div className="header__container">
            <div className="header__overlay"></div>

            {items?.[this.levelDescriptorUrl] &&
              this.renderHeaderLogo(
                parseDescriptor(items[this.levelDescriptorUrl]),
              )
            }

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
                  {
                    nav
                    && nav.entries['/']
                    && this.renderNavItems()
                  }
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

const mapDispatchToProps = dispatch => ({
  getItem: (url) => dispatch(getItem({url, config: { flatten: true }})),
});

const mapStateToProps = store => ({
  nav: store.craftercms.navigation,
  items: store.craftercms.items.entries,
  headerGhost: store.header.headerGhost
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
