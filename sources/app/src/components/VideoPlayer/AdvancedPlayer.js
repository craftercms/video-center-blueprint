import React, { useMemo, useState } from 'react';
import videojs from 'video.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VideoJSBasicPlayer from './VideoEditing/VideoJSBasicPlayer';
import { GoToVideoJSAdapter } from './VideoEditing/SeekTo';
import { LocalVideoChooserVideoJSAdapter } from './VideoEditing/LocalVideoChooser';
import { LooperVideoJSAdapter } from './VideoEditing/Looper';
import { ReversePlaybackVideoJSAdapter } from './VideoEditing/ReversePlayback';
import AdvancedControlsBarAdapter from './VideoEditing/AdvancedControlsBarAdapter';
import BasicControlsAdapter from './VideoEditing/BasicControlsAdapter';
import ClipControlsAdapter from './VideoEditing/ClipControlsAdapter';

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
    flex: '1',
    zIndex: 1
  },
  tab: {
    minWidth: 90
  },
  tabPanel: {
    padding: theme.spacing(1)
  },
  tabPanelItem: {
    marginBottom: theme.spacing(1)
  },
  videoRoot: {
    width: '580px',
  },
  videoVideo: {
    width: '580px',
    height: '380px',
    maxWidth: '100%'
  },
  controls: {
    padding: '25px'
  },
  control: {
    width: '100%',
    marginBottom: '25px'
  }
}));

export default function (props) {
  const id = 'mainPlayer';
  const classes = getClasses();
  const [value, setValue] = React.useState(0);
  const [src, setSrc] = useState({});

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <section className={classes.root}>
        <div className={classes.content}>
          <div className={classes.video}>
            <VideoJSBasicPlayer
              id={id} classes={{ root: classes.videoRoot, video: classes.videoVideo }}
            />
          </div>
          <div className={classes.ui}>
            <Paper>
              <Tabs
                value={value} onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Home" className={classes.tab} />
                <Tab label="Clip" className={classes.tab} />
                <Tab label="Streams" className={classes.tab} />
                <Tab label="Transcript" className={classes.tab} />
                <Tab label="Notes" className={classes.tab} />
                <Tab label="AI" className={classes.tab} />
              </Tabs>

              <div hidden={value !== 0}>
                <div className={classes.tabPanel}>
                  <div className={classes.tabPanelItem}>
                    <LocalVideoChooserVideoJSAdapter id={id} onChange={(value) => setSrc(value)} />
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
              </div>
              <div hidden={value !== 1}>
                <div className={classes.tabPanelItem}>
                  <ClipControlsAdapter
                    id={id}
                    classes={{ controls: classes.controls, control: classes.control }}
                  />
                </div>
                <div className={classes.tabPanelItem}>
                  <BasicControlsAdapter id={id} />
                </div>
              </div>
              <div hidden={value !== 2}>
                Streams
              </div>
              <div hidden={value !== 3}>
                Transcript
              </div>
              <div hidden={value !== 4}>
                Notes
              </div>
              <div hidden={value !== 5}>
                AI
              </div>
            </Paper>
          </div>
        </div>
        <AdvancedControlsBarAdapter id={id} src={src} />
      </section>
    </ThemeProvider>
  );
}

