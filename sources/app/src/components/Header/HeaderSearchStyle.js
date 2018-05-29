import { Modal } from 'antd';
import styled from 'styled-components';
// import { palette, font } from 'styled-theme';

const HeaderSearchModal = styled(Modal)`

    .ant-modal-content {
        -webkit-transition: background-color .2s cubic-bezier(0,1,.75,1);
        transition: background-color .2s cubic-bezier(0,1,.75,1);
        background-color: #23252a;
        -webkit-box-shadow: 0 0 20px #1c1f24;
        box-shadow: 0 0 20px #1c1f24;
        border-radius: 0;

        .ant-modal-body {
            max-width: 100%;
            width: 135rem;
            padding-right: 60px;
            margin: 0 auto;
            position: relative;

            .ant-input, .search__icon {
                color: #fff;
            }
            
            .ant-input {
                border: none;
                background-color: transparent;
                font-size: 24px;
                padding-left: 1em;
                outline: none;
                box-shadow: none;
            }

            .search__icon{
                position: absolute;
                top: 2.4em;
            }

            .ant-modal-close {
                color: hsla(0,0%,100%,.5);
                top: 1.2rem;
            }   
        }
    }

`;

export default HeaderSearchModal;
