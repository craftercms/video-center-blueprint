const common = {
  repoUrl: "https://github.com/craftercms/video-center-blueprint"
}

const studioConfig = {
  baseUrl: document.getElementById('studioBaseUrl').innerHTML,
  site: document.getElementById('studioSiteName').innerHTML,
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
