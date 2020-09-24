import Cookies from 'js-cookie';

const common = {
  repoUrl: 'https://github.com/craftercms/video-center-blueprint'
};

const site = document.getElementById('studioSiteName').innerHTML || Cookies.get('crafterSite');

let baseUrl = document.getElementById('studioBaseUrl').innerHTML;
if (baseUrl === 'null') {
  baseUrl = window.location.origin;
}

const studioConfig = {
  site,
  baseUrl,
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
