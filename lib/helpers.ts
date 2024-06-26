import { Campaign } from '@/types/model';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    dataLayer?: any[];
    lintrk?: any;
  }
}

const dev = process.env.NODE_ENV !== 'production';

/**
 * Log Analytic event
 */
type LogEventType = {
  eventName: string;
  eventValue?: string;
};

export const logEvent = ({ eventName, eventValue = undefined }: LogEventType): void => {
  const GAEvent = {
    event: eventName,
    action: eventName,
    value: eventValue
  };

  if (!dev) {
    const isBrowser = typeof window !== 'undefined';

    if (isBrowser) {
      if (window.dataLayer) {
        window.dataLayer.push(GAEvent);
      }
    }
  }
  console.log(`DEBUG-GAEvent: ${JSON.stringify(GAEvent)}`);
};

/**
 *
 * @returns Campaign intance
 */
function getAllUrlParams(url: string) {
  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj: any = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof a[1] === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {
        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position 


          // COMENTADO TIRA ERRORES!!


          
          // var index = /\[(\d+)\]/.exec(paramName)[1];
          // obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

export const getCampaignData = (): Campaign | undefined => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    const url = window.location.href;
    const data = getAllUrlParams(url);
    // console.log(data);
    return data;
  }

  return undefined;
};
