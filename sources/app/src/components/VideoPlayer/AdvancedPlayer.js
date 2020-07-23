import React, { useMemo } from 'react';
import videojs from 'video.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AdvancedControlsBar from './VideoEditing/AdvancedControlsBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VideoJSBasicPlayer from './VideoEditing/VideoJSBasicPlayer';
import { GoToVideoJSAdapter } from './VideoEditing/SeekTo';
import { LocalVideoChooserVideoJSAdapter } from './VideoEditing/LocalVideoChooser';
import { LooperVideoJSAdapter } from './VideoEditing/Looper';
import { ReversePlaybackVideoJSAdapter } from './VideoEditing/ReversePlayback';

window.videojs = videojs;

const getClasses = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 90,
    bottom: 65,
    right: 0,
    left: 0,
    background: '#141519',
    zIndex: 1
  },
  content: {
    height: '100%',
    display: 'flex',
    padding: '2em 1em'
  },
  video: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '2em',
    width: '65%'
  },
  ui: {
    flex: '1'
  },
  tab: {
    minWidth: 90
  },
  tabPanel: {
    padding: theme.spacing(1)
  },
  tabPanelItem: {
    marginBottom: theme.spacing(1)
  }
}));

export default function (props) {
  const id = 'mainPlayer';
  const classes = getClasses();
  const theme = useMemo(() => createMuiTheme({
    typography: { fontSize: 18 },
    palette: {
      type: 'dark',
      primary: {
        main: '#f00',
        contrastText: '#FFFFFF'
      }
    }
  }), []);
  return (
    <ThemeProvider theme={theme}>
      <section className={classes.root}>
        <div className={classes.content}>
          <div className={classes.video}>
            <VideoJSBasicPlayer id={id} />
          </div>
          <div className={classes.ui}>
            <Paper>
              <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Home" className={classes.tab} />
                <Tab label="Streams" className={classes.tab} />
                <Tab label="Transcript" className={classes.tab} />
                <Tab label="Notes" className={classes.tab} />
                <Tab label="AI" className={classes.tab} />
              </Tabs>
              <div className={classes.tabPanel}>
                <div className={classes.tabPanelItem}>
                  <LocalVideoChooserVideoJSAdapter id={id} />
                </div>
                <div className={classes.tabPanelItem}>
                  <LooperVideoJSAdapter id={id} />
                </div>
                <div className={classes.tabPanelItem}>
                  <ReversePlaybackVideoJSAdapter id={id} />
                </div>
                <div className={classes.tabPanelItem}>
                  <GoToVideoJSAdapter id={id} />
                </div>
              </div>
            </Paper>
          </div>
        </div>
        <AdvancedControlsBar />
      </section>
    </ThemeProvider>
  );
}

