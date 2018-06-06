import React, { Component } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { Route } from 'react-router-dom';
import HeaderSearchModal from './HeaderSearchStyle';
import InputSearch from './searchBox';

class HeaderSearch extends Component {

    state = {
        modalVisible: false
    }

    handleKeyPress = (e, history) => {
        if (e.key === 'Enter') {
          this.setModalVisible( false );
          history.push(`/search/${ e.target.value }`);
        }
    
    };

    setModalVisible( modalVisible ) {
        this.setState({ modalVisible });
    }

    render() {
        return (
            <div className="header__search--container">
                <i className="search__icon fa fa-search" onClick={() => this.setModalVisible(true)}></i>

                <HeaderSearchModal
                    style={{ top: 0 }}
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                    footer={ null }
                    className="header__search--modal"
                    width="100%"
                    closable={ false }
                    destroyOnClose={ true }
                    ref={node => (this.searchModal = node)}
                >
                    <i className="search__icon fa fa-search"></i>

                    <Route render={({ history}) => (
                        <InputSearch history={history}
                            handleKeyPress={this.handleKeyPress}
                        />
                    )} />
                    <button className="ant-modal-close" onClick={() => this.setModalVisible(false)}>
                        <span className="ant-modal-close-x"></span>
                    </button>
                </HeaderSearchModal>
            </div>
        );
    }

}

export default HeaderSearch;