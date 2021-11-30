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

export function isAuthoring() {
  const html = document.documentElement;
  const attr = html.getAttribute('data-craftercms-preview');
  return (
    // eslint-disable-next-line no-template-curly-in-string
    attr === '${modePreview?c}' || // Otherwise disable/enable if you want to see pencils in dev server.
    attr === 'true'
  );
}

let iceRepaintTimeout;
function ICERepaint() {
  clearTimeout(iceRepaintTimeout);
  iceRepaintTimeout = setTimeout(
    () => {
      window.amplify &&
      window.amplify.publish('INIT_ICE_REGIONS');
    },
    100
  );
}

export function getICE({ modelId, label }) {
  ICERepaint();

  return {
    props: (isAuthoring()) ? {
      'data-studio-ice': '',
      'data-studio-ice-path': modelId,
      'data-studio-ice-label': label
    } : {}
  };
}
