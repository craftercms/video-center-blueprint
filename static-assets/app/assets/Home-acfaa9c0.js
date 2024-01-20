import{r as d,j as s,F as n,L as c,H as p,a as l,f as m,b as h,p as u,S as v,C as _,c as g,i as x,V as f,s as b,g as y,d as j}from"./index-b37d7388.js";class k extends d.Component{componentWillUnmount(){clearInterval(this.interval)}render(){const{model:e,index:r,fieldId:o,slide:i}=this.props;return s.jsx("div",{className:"discover-slider__inner",children:s.jsxs(n,{component:c,model:e,fieldId:o,index:r,className:"discover-slider__link",to:i.url_s,children:[s.jsxs("div",{children:[s.jsx("div",{className:"image discover-slider__inner--background discover-slider__inner--background-mobile",children:s.jsx("div",{className:"image__image",style:{backgroundImage:`url("${i.background_s}")`}})}),s.jsx("div",{className:"image discover-slider__inner--background discover-slider__inner--background-desktop",children:s.jsx("div",{className:"image__image",style:{backgroundImage:`url("${i.background_s}")`}})})]}),s.jsxs("div",{className:"discover-slider__inner--content",children:[i.vod_s&&s.jsx("div",{className:"discover-slider__inner--vod",children:s.jsx(n,{component:"span",className:"discover-slider__inner--vod-label",model:e,index:r,fieldId:`${o}.vod_s`,children:i.vod_s})}),s.jsx(n,{component:"h1",className:"heading discover-slider__inner--title heading--medium heading--slider",model:e,index:r,fieldId:`${o}.title_t`,children:i.title_t}),i.logo_s&&s.jsx("div",{className:"discover-slider__inner--title discover-slider__inner--title--logo",style:{backgroundImage:`url("${i.logo_s}")`}}),s.jsx(n,{className:"discover-slider__inner--subtitle",model:e,index:r,fieldId:`${o}.subtitle_s`,children:p(i.subtitle_s)})]})]})})}}class N extends d.Component{componentDidMount(){const e=Array.isArray(this.props.data)?this.props.data:[this.props.data],r=e[0].key;this.setState({descriptorKey:r}),this.props.getDescriptor(r)}changeSlide(e){e==="previous"?this.slider.prev():this.slider.next()}renderSliderControls(){return s.jsxs("div",{className:"discover-slider__inner--nav",children:[s.jsx("label",{className:"discover-slider__inner--nav-button discover-slider__inner--nav-prev",onClick:()=>this.changeSlide("previous"),children:s.jsx(l,{className:"nav-icon",icon:m})}),s.jsx("label",{className:"discover-slider__inner--nav-button discover-slider__inner--nav-next",onClick:()=>this.changeSlide("next"),children:s.jsx(l,{className:"nav-icon",icon:h})})]})}renderSlider(e){var r=e.component.slides_o;const o=u(e);return r.item instanceof Array?r=r.item:r=[r.item],s.jsxs(v,{className:"hero-container hero-container__ghost",children:[s.jsx(_,{className:"discover-slider",effect:"fade",ref:i=>this.slider=i,autoplay:!0,children:r.map((i,a)=>s.jsx(k,{slide:i,model:o,index:a,fieldId:"slides_o"},a))}),r.length>1&&this.renderSliderControls()]})}render(){return s.jsx("div",{children:this.props.descriptors&&this.state&&this.state.descriptorKey&&this.props.descriptors[this.state.descriptorKey]&&this.renderSlider(this.props.descriptors[this.state.descriptorKey])})}}class S extends d.Component{constructor(e){super(e),this.props.setVideoDocked(!1),this.descriptorUrl="/site/website/index.xml",x(this.props.descriptors[this.descriptorUrl])&&this.props.getDescriptor(this.descriptorUrl)}componentDidMount(){this.props.setHeaderGhost(!0)}componentWillUnmount(){this.props.setHeaderGhost(!1)}renderSlider(e){if(e.page.slider_o.item)return s.jsx(N,{data:e.page.slider_o.item,getDescriptor:this.props.getDescriptor,descriptors:this.props.descriptors})}renderHomeContent(e){var r=e.page,o=[{key:"featured-videos",value:"Featured Videos",query:{bool:{filter:[{bool:{should:[{match:{"content-type":"/component/youtube-video"}},{match:{"content-type":"/component/video-on-demand"}}]}},{match:{featured_b:!0}}]}},numResults:r.maxVideosDisplay_i},{key:"latest-videos",value:"Latest Videos",query:{bool:{filter:[{bool:{should:[{match:{"content-type":"/component/youtube-video"}},{match:{"content-type":"/component/video-on-demand"}}]}}]}},sort:{by:"date_dt",order:"desc"},numResults:r.maxVideosDisplay_i},{key:"featured-channels",value:"Featured Channels",type:"channel-card-alt",query:{bool:{filter:[{match:{"content-type":"/component/component-channel"}},{match:{featured_b:!0}}]}},numResults:r.maxChannelsDisplay_i}];return s.jsxs("div",{children:[this.renderSlider(e),s.jsx(f,{categories:o})]})}render(){var{descriptors:e}=this.props;return s.jsx("div",{children:e&&e[this.descriptorUrl]&&this.renderHomeContent(e[this.descriptorUrl])})}}function D(t){return{videoStatus:t.video.videoStatus,descriptors:t.craftercms.descriptors.entries}}function C(t){return{setVideoDocked:e=>{t(b(e))},getDescriptor:e=>{t(y(e))},setHeaderGhost:e=>{t(j(e))}}}const I=g(D,C)(S);export{I as default};