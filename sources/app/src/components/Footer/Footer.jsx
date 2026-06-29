import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItem } from '@craftercms/redux';
import FooterHolder from './FooterStyle';
import { parseDescriptor } from "@craftercms/content";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.footerUrl = '/site/components/footer.xml';
    this.props.getItem(this.footerUrl);
  }

  renderFooterNav(nav) {
    if (Object.keys(nav).length === 0 && nav.constructor === Object) {
      return null;
    }
    return nav.item.map((entry, i) => {
      return (
        <a
          key={i}
          className="footer__link"
          target="_blank"
          href={entry.link_s}
          rel="noopener noreferrer"
        >
          {entry.title_t}
        </a>
      );
    });
  }

  renderFooterContent(item) {
    const currentYear = new Date().getFullYear(),
      updatedCopyright = item.copyrightLabel_t.replace('{year}', currentYear);

    return (
      <div className="footer__content">
        <div className="footer__copyright">
          {updatedCopyright}
        </div>

        <div className="footer__nav">
          {item.nav_o &&
            this.renderFooterNav(item.nav_o)
          }
        </div>
      </div>
    );
  }

  render() {
    return (
      <FooterHolder>
        <footer className="footer">
          {this.props.items?.[this.footerUrl] &&
            this.renderFooterContent(parseDescriptor(this.props.items[this.footerUrl]))
          }
        </footer>
      </FooterHolder>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getItem: (url) => dispatch(getItem({url, config: { flatten: true }})),
});

const mapStateToProps = store => ({
  items: store.craftercms.items.entries
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
