import Cookies from 'js-cookie';

const common = {
  repoUrl: 'https://github.com/craftercms/video-center-blueprint'
};

const site = document.getElementById('studioSiteName').innerHTML || Cookies.get('crafterSite');

const studioConfig = {
  site,
  baseUrl: document.getElementById('studioBaseUrl').innerHTML || window.location.origin,
  navTreeBase: '/site/website'
};

const themeConfig = {
  theme: 'themedefault'
};

export {
  common,
  studioConfig,
  themeConfig
};
