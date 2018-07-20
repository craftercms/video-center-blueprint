import React, { Component } from "react";

import { studioConfig } from '../../settings';
import { EngineClient } from '@craftercms/sdk/lib/craftercms';

import FooterHolder from './FooterStyle';

class Footer extends Component {
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
                                    { this.state.content.nav &&
                                        this.renderFooterNav()     
                                    }
                                </div>
                            </div>
                        }
                </footer>

                {/* <a href="https://github.com/you">
                    <img style={{ position: 'absolute', bottom: 0, right: 0, border: 0, width: '149px', height: '149px' }}
                         src="http://aral.github.com/fork-me-on-github-retina-ribbons/right-graphite@2x.png" 
                         alt="Fork me on GitHub"/>
                </a> */}
            </FooterHolder>
        );
    }
}

export default Footer;