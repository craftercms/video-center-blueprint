/*
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useReducer, useState } from 'react';
import videojs from 'video.js';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Player from './VideoEditing/Player';
import { GoToVideoJSAdapter } from './VideoEditing/SeekTo';
import { LocalVideoChooserVideoJSAdapter } from './VideoEditing/LocalVideoChooser';
import { LooperVideoJSAdapter } from './VideoEditing/Looper';
import { ReversePlaybackVideoJSAdapter } from './VideoEditing/ReversePlayback';
import ClippingControlsVideoJSAdapter from './VideoEditing/ClippingControls';
import SkipSetter from './VideoEditing/SkipSetter';
import Transcript from './VideoEditing/Transcript';
import { AdvancedControlsBarAdapter } from './VideoEditing/AdvancedControlsBar';
import Markers from './VideoEditing/Markers';
import ArtificialIntelligence from './VideoEditing/ArtificialIntelligence';
import { StreamListFetcherVideoJSAdapter } from './VideoEditing/StreamsList';
import Root from './VideoEditing/Root';
import { useVideoJSControlsOnFullScreen, useVideoJSVolume } from './VideoEditing/util';

window.videojs = videojs;

const getClasses = makeStyles((theme) => ({
  content: {
    height: '100%',
    display: 'flex',
    padding: '2em 4em'
  },
  video: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '2em'
  },
  ui: {
    zIndex: 1,
    width: 520
  },
  tab: {
    minWidth: 80
  },
  tabPanel: {
    padding: theme.spacing(1)
  },
  tabPanelItem: {
    marginBottom: theme.spacing(1)
  },
  videoRoot: {
    width: '100%',
  },
  videoVideo: {
    width: '100%'
  },
  controls: {
    padding: '25px'
  },
  control: {
    width: '100%',
    marginBottom: '25px'
  }
}));

export default function () {

  const id = 'mainPlayer';
  const classes = getClasses();
  const [tab, setTab] = React.useState(0);
  // TODO: Move clip dialog out of advanced bar — then, it needn't receive "src" prop
  const [src, setSrc] = useState({});
  const [volume, setVolume] = useVideoJSVolume(id);
  const [context, setContext] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    { skip: 10 }
  );

  const onTabClick = (e, nextTab) => setTab(nextTab);

  useVideoJSControlsOnFullScreen(id);

  return (
    <Root>
      <div className={classes.content}>
        <div className={classes.video}>
          <Player
            id={id}
            options={{ volume, muted: volume === 0 }}
            classes={{ root: classes.videoRoot, video: classes.videoVideo }}
          />
        </div>
        <div className={classes.ui}>
          <Tabs
            value={tab}
            onChange={onTabClick}
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
          <div className={classes.tabPanel} hidden={tab !== 0}>
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
            <div className={classes.tabPanelItem}>
              <SkipSetter skip={context.skip} onSetSkip={(skip) => setContext({ skip })} />
            </div>
          </div>
          <div className={classes.tabPanel} hidden={tab !== 1}>
            <div className={classes.tabPanelItem}>
              <ClippingControlsVideoJSAdapter
                id={id}
                classes={{ controls: classes.controls, control: classes.control }}
              />
            </div>
          </div>
          <div className={classes.tabPanel} hidden={tab !== 2}>
            <StreamListFetcherVideoJSAdapter id={id} />
          </div>
          <div className={classes.tabPanel} hidden={tab !== 3}>
            <Transcript />
          </div>
          <div className={classes.tabPanel} hidden={tab !== 4}>
            <Markers />
          </div>
          <div className={classes.tabPanel} hidden={tab !== 5}>
            <ArtificialIntelligence />
          </div>
        </div>
      </div>
      <AdvancedControlsBarAdapter
        id={id}
        src={src}
        skip={context.skip}
        volume={volume}
        setVolume={setVolume}
      />
    </Root>
  );

}

