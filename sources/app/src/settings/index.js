import Cookies from 'js-cookie';

const common = {
  repoUrl: 'https://github.com/craftercms/video-center-blueprint'
};

let site = document.getElementById('studioSiteName').innerHTML;
if(site === '' || site === 'null') {
  site = Cookies.get('crafterSite');
}

let baseUrl = document.getElementById('studioBaseUrl').innerHTML;
if (baseUrl === '' || baseUrl === 'null') {
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
