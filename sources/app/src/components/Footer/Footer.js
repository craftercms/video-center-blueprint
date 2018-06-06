import React, { Component } from "react";

import { studioConfig } from '../../settings';
import { EngineClient } from '@craftercms/sdk/lib/craftercms';

import FooterHolder from './FooterStyle';

class Footer extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const self = this;
        var engineClient = new EngineClient(studioConfig.baseUrl, studioConfig.site);
        var contentStoreService = engineClient.contentStoreService;
    
        contentStoreService.getItem("/site/components/footer.xml").then(item => {
            self.setState({ content: item.descriptorDom.component });
        });
    
    }
    
    renderFooterNav() {
        return this.state.content.nav.item.map((entry, i) => {
            return (
                <a key={ i } className="footer__link" target="_blank">{ entry.title }</a>
            );
        });
    }

    render() {
        return (
            <FooterHolder>
                <footer className="footer">
                    
                        { this.state && this.state.content &&
                            <div className="footer__content">
                                <div className="footer__copyright">
                                    { this.state.content.copyrightLabel }
                                </div>

                                <div className="footer__nav">
                                    { this.renderFooterNav() }
                                </div>
                            </div>
                        }
                </footer>
            </FooterHolder>
        );
    }
}

export default Footer;