/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
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

import React, { useEffect, useState } from 'react';
import { urlTransform, getItem, parseDescriptor } from '@craftercms/content';
import { map } from 'rxjs/operators';
import { isAuthoring } from './utils';
import { ExperienceBuilder, ContentType } from '@craftercms/experience-builder/react';
import contentTypeMap from './contentTypeMap';

export default function DynamicRoute(props) {
  const { match, location } = props;
  const [ state, setState ] = useState(null);
  let url = match.path.replace(new RegExp(":.+","gm"), '');

  useEffect(() => {
    let destroyed = false;

    urlTransform('renderUrlToStoreUrl', url).subscribe((path) => {
      getItem(path).pipe(
        map(parseDescriptor)
      ).subscribe((model) => {
        if (!destroyed) {
          setState({
            model
          });
        }
      });
      return () => {
        destroyed = true;
      };
    });

  }, [url, location.search]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [url]);

  if (state === null) {
    return <div></div>
  } else {
    return <ExperienceBuilder
      isAuthoring={isAuthoring()}
      path={state.model?.craftercms.path}
    >
      <ContentType
        {...state}
        {...props}
        contentTypeMap={contentTypeMap}
      />
    </ExperienceBuilder>
  }
}
