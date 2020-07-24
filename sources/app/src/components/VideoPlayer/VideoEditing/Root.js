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

import React, { useMemo } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const getClasses = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: 90,
    bottom: 65,
    right: 0,
    left: 0,
    background: '#141519',
    zIndex: 1
  }
}));

export default function ({ children }) {
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
      <section children={children} className={classes.root} />
    </ThemeProvider>
  )
}
