import moment from 'moment';
import 'moment-timezone';

// Scrolls page to top
export function pageScrollTop() {
  const mainContainer = document.querySelector('.app-content__main');
  mainContainer.scrollTop = 0;
}

// Returns an object with formatted date parts - Using Crafter Studio Date
export function formatDate(studioDate) {
  var date = new Date(studioDate),
    clientTimezone = moment.tz(moment.tz.guess()).format('z'),
    dateFormatted = {
      month: moment(date).format('MMM'),
      weekDay: moment(date).format('dddd'),
      monthDay: moment(date).format('Do'),
      year: moment(date).format('YYYY'),
      time: moment(date).format('LT'),
      timezone: clientTimezone,
      dateObj: date,
      calendar: moment(date).calendar()
    };

  return dateFormatted;
}

let UND;
// Null Or Undefined (nou)
export function nou(object) {
  return object === null || object === UND;
}

export function defaultSearchQuery(category, from = 0, size) {
  let sort = {};
  if (!nou(category.sort)) {
    sort = [{
      [category.sort.by]: {
        ...(
          category.sort.unmapped_type
            ? {'unmapped_type' : category.sort.unmapped_type}
            : {}
        )
        ,
        'order': category.sort.order
      }
    }];
  }

  return {
    'query': {
      'bool': {
        'filter': [
          {
            'bool': {
              'should': [
                // matches 'youtube-video' or 'video-on-demand'
                {
                  'match': {
                    'content-type': '/component/youtube-video'
                  }
                },
                {
                  'match': {
                    'content-type': '/component/video-on-demand'
                  }
                },
                // or matches 'stream' and active
                {
                  'bool': {
                    'filter': [
                      {
                        'match': {
                          'content-type': '/component/stream',
                        }
                      },
                      {
                        'range': {
                          'startDate_dt': {
                            'lt': 'now'
                          }
                        }
                      },
                      {
                        'range': {
                          'endDate_dt': {
                            'gt': 'now'
                          }
                        }
                      }
                    ]
                  }
                },
                // or matches 'stream' and upcoming
                {
                  'bool': {
                    'filter': [
                      {
                        'match': {
                          'content-type': '/component/stream',
                        }
                      },
                      {
                        'range': {
                          'startDate_dt': {
                            'gt': 'now'
                          }
                        }
                      }
                    ]
                  }
                },
              ]
            }
          },
          {
            'match': {
              'channels_o.item.key': category.key
            }
          }
        ]
      },
    },
    'sort': sort,
    'from': from,
    ...(!nou(size) ? { 'size': size } : {})
  };
};