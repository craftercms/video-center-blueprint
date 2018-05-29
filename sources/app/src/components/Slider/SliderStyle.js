import styled from 'styled-components';
// import { palette, font } from 'styled-theme';

const SliderHolder = styled.div`
    height: calc(100vh - 220px);
    margin: 0;
    overflow: hidden;
    background-color: #23252a;
    position: relative;

    &.hero-container__ghost {
        height: 75vh;
    }

    .ant-carousel, .discover-slider, .discover-slider .slick-track{
        height: inherit;
    }

    .ant-carousel{
        .discover-slider {
            .slick-list {
                cursor: pointer;
                margin: 0;
                padding: 0;
                border: 0;
                vertical-align: baseline;
                font-family: inherit;
                font-size: inherit;
                font-weight: inherit;
                line-height: inherit;
                width: auto;
                list-style: none;
                position: relative;
                height: inherit;
                width: 100%;
                -ms-scroll-chaining: none;
                -ms-scroll-snap-type: mandatory;
                -ms-scroll-snap-points-x: snapInterval(0,100%);

                .slick-slide {
                    height: inherit;
                    width: 100%;
                    /* position: absolute; */
                    top: 0;
                    left: 0;
                    -webkit-transition: opacity .3s ease-out;
                    transition: opacity .3s ease-out;
                    /* opacity: 0; */
                    overflow: hidden;
                    -webkit-transform: translateZ(0);
                    transform: translateZ(0);

                    .discover-slider__inner, .discover-slider__video {
                        height: inherit;
                        width: 100%;
                        overflow: hidden;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        -webkit-box-pack: center;
                        -ms-flex-pack: center;
                        justify-content: center;
                    }

                    .discover-slider__inner--background, .discover-slider__video--background {
                        -webkit-transition: opacity .3s cubic-bezier(0,1,.75,1),-webkit-transform 1.5s cubic-bezier(0,1,.75,1);
                        transition: opacity .3s cubic-bezier(0,1,.75,1),-webkit-transform 1.5s cubic-bezier(0,1,.75,1);
                        transition: transform 1.5s cubic-bezier(0,1,.75,1),opacity .3s cubic-bezier(0,1,.75,1);
                        transition: transform 1.5s cubic-bezier(0,1,.75,1),opacity .3s cubic-bezier(0,1,.75,1),-webkit-transform 1.5s cubic-bezier(0,1,.75,1);
                        background-color: #000;
                        z-index: 1;
                    }

                    @media (min-width: 28.125em){
                        .discover-slider__inner--background-mobile, .discover-slider__video--background-mobile {
                        display: none;
                        }
                    }

                    .discover-slider__inner--background-banner, .discover-slider__inner--background-desktop, .discover-slider__inner--background-mobile, .discover-slider__video--background-banner, .discover-slider__video--background-desktop, .discover-slider__video--background-mobile {
                        opacity: .7;
                    }

                    .discover-slider__inner--background-desktop .image__image, .discover-slider__video--background-desktop .image__image {
                        background: 50% 30% no-repeat;
                        background-size: cover;
                    }

                    .discover-slider__inner--content, .discover-slider__video--content {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 7rem;
                        margin: 0 auto;
                        z-index: 90;
                        text-align: center;
                        -ms-flex-item-align: baseline;
                        align-self: baseline;
                        padding: 0 3rem 1rem;
                        color: #fff;

                        @media (max-height: 47.9375em){
                            bottom: 4rem;
                        }
                    }
                    
                    .discover-slider__inner--live, .discover-slider__inner--time, .discover-slider__inner--vod, .discover-slider__video--live, .discover-slider__video--time, .discover-slider__video--vod {
                        display: inline-block;
                        position: relative;
                        margin: 0 0 2rem;
                        padding: .8rem 1.4rem;
                    }
                    
                    .discover-slider__inner--time, .discover-slider__inner--vod, .discover-slider__video--time, .discover-slider__video--vod {
                        background-color: rgba(0,0,0,.3);
                    }
                    
                    .discover-slider__inner--vod, .discover-slider__video--vod {
                        display: inline-block;
                        text-transform: uppercase;
                    }
                    
                    .discover-slider__inner--subtitle, .discover-slider__inner--title, .discover-slider__video--subtitle, .discover-slider__video--title {
                        -webkit-transition: all .25s cubic-bezier(0,1,.75,1);
                        transition: all .25s cubic-bezier(0,1,.75,1);
                    }
                    
                    .discover-slider__inner--title, .discover-slider__video--title {
                        margin: 0;
                    }
                    
                    @media (max-height: 48em) and (min-width: 48em){
                        .discover-slider__inner--title, .discover-slider__video--title {
                        font-size: 6rem;
                        }
                    }
                    
                    @media (max-height: 37.5em){
                        .discover-slider__inner--title, .discover-slider__video--title {
                        font-size: 4.5rem;
                        }
                    }
                    
                    .discover-slider__inner--subtitle, .discover-slider__inner--title, .discover-slider__video--subtitle, .discover-slider__video--title {
                        -webkit-transition: all .25s cubic-bezier(0,1,.75,1);
                        transition: all .25s cubic-bezier(0,1,.75,1);
                    }

                    
                    .discover-slider__inner--title--logo, .discover-slider__video--title--logo {
                        min-height: 8rem;
                        min-width: 30rem;
                        background-position: 50%;
                        background-size: contain;
                        background-repeat: no-repeat;
                        max-width: 700px;
                        margin: 0 auto;

                        @media (min-width: 48em) {
                            min-height: 10rem;
                            min-width: 40rem;
                        }

                        @media (min-width: 60em) {
                            min-height: 10rem;
                            min-width: 60rem;
                        }

                    }
                    
                    .discover-slider__inner--subtitle, .discover-slider__video--subtitle {
                        font-size: 1.6rem;
                        line-height: 1.1;
                        text-align: center;
                        font-weight: 500;
                        padding-top: 2rem;
                    }
                    
                    @media (min-width: 48em){
                        .discover-slider__inner--subtitle, .discover-slider__video--subtitle {
                        font-size: 2rem;
                        }
                    }
                }
            }

            .slick-dots {
                bottom: 22px;

                li{
                    button {
                        width: 1rem;
                        height: 1rem;
                        margin: 0 .3rem;
                        position: relative;
                        border-radius: 100%;
                        border: .2rem solid #fff;
                        background: none;
                        opacity: 1;
                        cursor: pointer;
                    }

                    &.slick-active {
                        button {
                            -webkit-transition: background .3s ease-out;
                            transition: background .3s ease-out;
                            background: #fff;
                        }
                    }
                }
            }

            &:hover {
                .image {
                    -webkit-transform: scale(1.02);
                    transform: scale(1.02)
                }
            }
        }
    } 

    .discover-slider__inner--nav {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-transition: all .15s cubic-bezier(0,1,.75,1);
        transition: all .15s cubic-bezier(0,1,.75,1);
        z-index: 999;

        opacity: 0;
        z-index: 100;
        width: 100%;
        height: 0;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;

        label {
            display: flex;

            -webkit-transition: all .15s cubic-bezier(0,1,.75,1);
            transition: all .15s cubic-bezier(0,1,.75,1);
            z-index: 999;

            cursor: pointer;
            background: #fff;
            height: 8rem;
            width: 6rem;

            top: 50%;
            position: absolute;
            margin-top: -4rem;

            align-items: center;
            justify-content: center;

            &:hover {
                -webkit-transition: all .15s cubic-bezier(0,1,.75,1);
                transition: all .15s cubic-bezier(0,1,.75,1);
                background: #db0a40;

                i {
                    color: #fff;
                }
            }

            &.discover-slider__inner--nav-prev {
                left: 0;
                margin-right: 4px;
            }

            &.discover-slider__inner--nav-next {
                right: 0;
                margin-left: 4px;
            }

            i {
                color: #db0a40;
                font-size: 1.5em;
                font-weight: bold;
            }
        }
    }

    &:hover{
        .discover-slider__inner--nav {
            -webkit-transition: opacity .2s ease-out;
            transition: opacity .2s ease-out;
            opacity: 1;

            .discover-slider:hover .discover-slider__inner--nav-next, .discover-slider:hover .discover-slider__inner--nav-prev {
                -webkit-transform: translate3d(0,-4rem,0);
                transform: translate3d(0,-4rem,0);
            }
        }
    }

    .heading--slider {
        text-transform: uppercase;
        margin-bottom: 1rem;
    }
`;

export default SliderHolder;