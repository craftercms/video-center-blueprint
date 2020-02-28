import Cookies from 'js-cookie';

const common = {
  repoUrl: "https://github.com/craftercms/video-center-blueprint"
}

const site = document.getElementById('studioSiteName').innerHTML
  ? document.getElementById('studioBaseUrl').innerHTML
  : Cookies.get('crafterSite');

const studioConfig = {
  baseUrl: document.getElementById('studioBaseUrl').innerHTML,
  site,
  navTreeBase: "/site/website"
}

const themeConfig = {
  theme: 'themedefault'
};

export {
  common,
  studioConfig,
  themeConfig
};
