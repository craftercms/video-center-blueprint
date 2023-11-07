import{e as m,h,c,r as o,j as t,V as l,s as d,a as u,k as f,i as g}from"./index-7194951e.js";const b=m.div`
    .channel-card-alt {
        position: relative;
        width: 100%;
        margin-bottom: 2rem;
        height: 0;
        padding-bottom: 40%;
        overflow: hidden;
        line-height: 1;
        cursor: pointer;
        background: ${h.palette("primary",2)};

        @media (min-width: 60em) {
            height: 0;
            padding-bottom: 56.25%;
        }

        @media (min-width: 75em){
            height: 0;
            padding-bottom: 66.667%;
        }

        .channel-card-alt__link {
            color: inherit;
            text-decoration: none;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;

            .channel-card-alt__image {
                overflow: hidden;
                -webkit-transition-property: -webkit-transform;
                transition-property: -webkit-transform;
                transition-property: transform;
                transition-property: transform,-webkit-transform;
                -webkit-transition-duration: .6s;
                transition-duration: .6s;
                -webkit-transition-timing-function: cubic-bezier(0,1,.75,1);
                transition-timing-function: cubic-bezier(0,1,.75,1);
                min-width: 101%;
                margin: auto;

                &:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: -webkit-gradient(linear,left bottom,left top,color-stop(0,rgba(17,22,31,.5)),to(rgba(17,22,31,0)));
                    background: linear-gradient(0deg,rgba(17,22,31,.5),rgba(17,22,31,0));
                    z-index: 9;
                }

                .channel-card-alt__overlay {
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: #000;
                    opacity: .2;
                    -webkit-transition: opacity .15s cubic-bezier(0,1,.75,1);
                    transition: opacity .15s cubic-bezier(0,1,.75,1);
                }
            }

            .channel-card-alt__heading {
                margin: 0;
                padding: 0;
                border: 0;
                vertical-align: baseline;
                font-family: inherit;
                font-size: inherit;
                font-weight: inherit;
                line-height: inherit;
                width: auto;
                color: #fff;
                position: relative;
                z-index: 10;
                margin: 0 1rem -.4rem;
                font-size: 2.3rem;
                font-weight: 800;
                text-transform: uppercase;
                text-align: center;

                &:after {
                    display: block;
                    content: "";
                    position: relative;
                    top: .5rem;
                    border-bottom: .3rem solid #fff;
                    opacity: 0;
                    -webkit-transform: translateY(1rem);
                    transform: translateY(1rem);
                    -webkit-transition: all .15s;
                    transition: all .15s;
                }

                @media (min-width: 60em){
                    font-size: 2rem;
                }

                @media (min-width: 75em){
                    font-size: 2.5rem;
                }

                @media (min-width: 114.0625em) {
                    font-size: 3rem;
                }
            }

        }

        &:hover{

            .channel-card-alt__link{
                .channel-card-alt__image {
                    -webkit-transform: scale3d(1.1,1.1,1);
                    transform: scale3d(1.1,1.1,1);

                    .channel-card-alt__overlay {
                        opacity: .6;
                    }
                }

                .channel-card-alt__heading:after {
                    opacity: 1;
                    -webkit-transform: translateY(0);
                    transform: translateY(0);
                }
            }

        }
    }
`;class v extends o.Component{constructor(e){super(e),this.props.setVideoDocked(!1),this.state={searchId:this.props.match.params.query,categories:[{key:"featured-channels",value:"Featured Channels",type:"channel-card-alt",query:{bool:{filter:[{match:{"content-type":"/component/component-channel"}},{match:{featured_b:!0}}]}}},{key:"all-channels",value:"All Channels",type:"channel-card-alt",query:{bool:{filter:[{match:{"content-type":"/component/component-channel"}}]}},numResults:100}]}}render(){return t.jsx(b,{children:t.jsx("div",{className:"",children:t.jsx(l,{categories:this.state.categories})})})}}function y(n){return{videoInfo:n.video.videoInfo,videoStatus:n.video.videoStatus}}function _(n){return{setVideoDocked:e=>{n(d(e))}}}const w=c(y,_)(v);class k extends o.Component{constructor(e){super(e),this.props.setVideoDocked(!1),this.state={searchId:this.props.match.params.query,categories:[{key:"active-events",value:"Active Events",type:"live-event-item",query:{bool:{filter:[{match:{"content-type":"/component/stream"}},{range:{startDate_dt:{lt:"now"}}},{range:{endDate_dt:{gt:"now"}}}]}},sort:{by:"startDate_dt",order:"asc",unmapped_type:"date"},numResults:6},{key:"upcoming-events",value:"Upcoming Events",type:"live-event-item",query:{bool:{filter:[{match:{"content-type":"/component/stream"}},{range:{startDate_dt:{gt:"now"}}}]}},sort:{by:"startDate_dt",order:"asc",unmapped_type:"date"},numResults:6},{key:"past-events",value:"Past Events",type:"live-event-item",noLinks:!0,query:{bool:{filter:[{match:{"content-type":"/component/stream"}},{range:{endDate_dt:{lt:"now"}}}]}},sort:{by:"endDate_dt",order:"desc",unmapped_type:"date"},numResults:6}]}}render(){return t.jsx("div",{children:t.jsx(l,{categories:this.state.categories})})}}function x(n){return{videoInfo:n.video.videoInfo,videoStatus:n.video.videoStatus}}function C(n){return{setVideoDocked:e=>{n(d(e))}}}const j=c(x,C)(k),z=m.div`

    .search-bar--sticky{
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 996;

        .search-bar {
            position: relative;
            overflow: hidden;
            z-index: 998;
            background: ${h.palette("primary",2)};
            pointer-events: none;
            opacity: 0;
            -webkit-transition: opacity 225ms;
            transition: opacity 225ms;

            &.search-bar--visible {
                opacity: 1;
                pointer-events: all;
            }

            .search-bar__container {
                position: relative;
                margin: 0 auto;
                min-height: .1rem;
                width: 110rem;
                max-width: 100%;
                padding: 0 4rem;
                height: 7rem;

                @media (min-width: 75em){
                    width: 110rem;
                }

                @media (min-width: 87.5em){
                    width: 120rem;
                }

                @media (min-width: 114.0625em){
                    width: 135rem;
                }

                .search-bar__inner {
                    position: relative;

                    .search-bar__icon {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        margin-top: -2.5rem;
                        line-height: 5rem;

                        .search__icon {
                            font-size: .8em;
                            color: hsla(0,0%,100%,.5);
                        }
                    }

                    .search-bar__input {
                        margin: 0;
                        padding: 0;
                        border: 0;
                        vertical-align: baseline;
                        font-family: inherit;
                        font-size: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                        width: auto;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        display: block;
                        padding-left: 3.5rem;
                        width: 100%;
                        font-size: 2.2rem;
                        font-weight: 500;
                        color: #e2e3e5;
                        line-height: 7rem;
                        outline: none;
                        border: none;
                        background: none;
                        font-size: 2.6rem;
                    }
                }
            }
        }
    }
`,D=1e3;class q extends o.Component{constructor(e){super(e),this.props.setVideoDocked(!1),this.timer=null,this.searchId=this.props.match.params.query,this.state={categories:this.setCategories(this.searchId)}}componentDidMount(){this.appContentEl=document.getElementById("app-content"),this.appContentEl.classList.add("search-content")}componentWillUnmount(){this.appContentEl.classList.remove("search-content")}componentWillReceiveProps(e){let i=e.match.params.query,a=this.setCategories(i);this.searchInput.value=i??"",this.setState({categories:a})}setCategories(e){let i=g(e)?"":e;const a=["title_t^1.5","description_html^1","tags_o.item.value_smv^1"];let r={};r.filter=[{terms:{"content-type":["/component/youtube-video","/component/video-on-demand","/component/stream"]}}];const p=/.*("([^"]+)").*/,s=i.match(p);return s?(r.must=[{multi_match:{query:s[2],fields:a,fuzzy_transpositions:!1,auto_generate_synonyms_phrase_query:!1}}],i=i.replace(s[1],"")):r.minimum_should_match=1,i&&(r.should=[{multi_match:{query:i,fields:a,type:"phrase_prefix",boost:1.5}},{multi_match:{query:i,fields:a}}]),[{key:"top-results",value:"Top Results",query:{bool:r},viewAll:!1,numResults:90}]}onChange(e){var i=this,a=e.target.value;clearTimeout(this.timer),this.timer=setTimeout(function(){var r=i.setCategories(a);i.setState({categories:r})},D)}render(){return t.jsxs(z,{children:[t.jsx("div",{className:"search-bar--sticky",children:t.jsx("div",{className:"search-bar search-bar--visible",children:t.jsx("div",{className:"search-bar__container",children:t.jsxs("div",{className:"search-bar__inner",children:[t.jsx("div",{className:"search-bar__icon",children:t.jsx(u,{className:"search__icon",icon:f})}),t.jsx("input",{type:"text",className:"search-bar__input",placeholder:"Start Typing...",ref:e=>this.searchInput=e,defaultValue:this.searchId,onChange:this.onChange.bind(this)})]})})})}),t.jsx(l,{categories:this.state.categories})]})}}function I(n){return{videoInfo:n.video.videoInfo,videoStatus:n.video.videoStatus}}function S(n){return{setVideoDocked:e=>{n(d(e))}}}const E=c(I,S)(q);class V extends o.Component{render(){switch(this.props.match.path){case"/channels":return t.jsx(w,{...this.props});case"/live-events":return t.jsx(j,{...this.props});case"/search":case"/search/:query":return t.jsx(E,{...this.props});default:return t.jsx(t.Fragment,{})}}}export{V as default};
