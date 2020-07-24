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

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { formatSeconds } from './util';

const getClasses = makeStyles(() => ({
  time: {
    textAlign: 'right'
  }
}));

const ITEMS = new Array(10).fill({ time: 0, copy: 'Maecenas sed diam eget risus varius blandit sit amet non magna. Vestibulum id ligula porta felis euismod semper.' })

export default function (props) {
  const { items = ITEMS } = props;
  const cls = getClasses();
  return (
    <>
      <Grid container spacing={2}>
        {
          items.map((item, i) =>
            <React.Fragment key={i}>
              <Grid item xs={2}>
                <Typography className={cls.time} children={formatSeconds(item.time)} />
              </Grid>
              <Grid item xs={10}>
                <Typography children={item.copy} />
              </Grid>
            </React.Fragment>
          )
        }
      </Grid>
    </>
  );
}
