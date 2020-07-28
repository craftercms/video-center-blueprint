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

import React, { Fragment, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { SearchService } from '@craftercms/search';
import { crafterConf } from '@craftercms/classes';
import { usePlayer } from './util';

const getClasses = makeStyles(() => ({
  root: {},
  inline: {
    display: 'inline'
  }
}));

export function StreamListFetcherVideoJSAdapter({ id, onStreamSelected: onStreamSelectedProp }) {
  const player = usePlayer(id);
  const onStreamSelected = (stream) => {
    let src = stream.url_s, type;
    if (src.includes('m3u8')) {
      type = 'application/x-mpegURL'
    } else if(src.includes('mpd')) {
      type = 'application/dash+xml'
    }
    if (type) {
      const source = { src, type };
      player().src(src);
      player().play();
      onStreamSelectedProp && onStreamSelectedProp(source);
    } else {
      alert('Stream format not recognized.');
    }
  };
  return <StreamListFetcher onStreamSelected={onStreamSelected} />;
}

export function StreamListFetcher({ onStreamSelected }) {
  const [streams, setStreams] = useState(null);
  useEffect(() => {
    SearchService.search(
      SearchService.createQuery('elasticsearch', {
        query: {
          'bool': {
            'filter': [
              {
                'match': {
                  'content-type': '/component/stream-origin'
                }
              }
            ]
          }
        }
      }),
      crafterConf.getConfig()
    ).subscribe((response) => {
      setStreams(response.hits.map(hit => hit._source));
    });
  }, []);
  return (
    streams
      ? <StreamsList streams={streams} onStreamSelected={onStreamSelected} />
      : <Typography children="Loading..." />
  );
}

export function StreamsList(props) {
  const { streams = [], onStreamSelected } = props;
  const classes = getClasses();
  return (
    <>
      <List className={classes.root}>
        {
          streams.map((stream, i) =>
            <Fragment key={i}>
              <ListItem alignItems="flex-start" button onClick={() => onStreamSelected(stream)}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="http://placekitten.com/g/100/100" />
                </ListItemAvatar>
                <ListItemText
                  primary={stream['internal-name']}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {stream.url_s}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          )
        }
      </List>
    </>
  );
}

export default StreamsList;
