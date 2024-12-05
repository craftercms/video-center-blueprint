import React, { Suspense, Component } from 'react';
import Router from './Router';
import { ThemeProvider } from 'styled-components';
import themes from './settings/themes';
import { themeConfig } from './settings';
import AppHolder from './AppStyle';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer';
import VideoPlayer from './components/VideoPlayer/VideoPlayer.jsx';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <Provider store={store}>
          <AppHolder className="app">
            <div className="app-content">
              <div className="app-content__cont" id="app-content">
                <div className="app-content__main">
                  <Header />

                  <div id="app-content-player">
                    <VideoPlayer />
                  </div>

                  <Suspense
                    fallback={
                      <div />
                    }
                  >
                    <Router />
                  </Suspense>

                  <Footer />
                </div>
              </div>
            </div>
          </AppHolder>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
