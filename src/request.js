const axios = require('axios');

/**
 * @param {object} options Axios request options
 * @param {boolean} [raw] Get raw or JSON data
 * @param {string} [content] Request body content
 * @returns {Promise<{ data: (string | object | array), cookies: string[] }>} Result
 */
function request(options = {}, raw = false, content = '') {
  if (!options.url && (options.hostname || options.host) )
  {
    options.url = 
      options.port==443 ? "https://" : "http://"+
      (options.hostname || options.host)+
      options.path || "/";
  }

  if (!options.method)
    options.method = 'get';
    
  if (raw)
    options.responseType = 'arraybuffer';

  return new Promise((resolve, reject) => {
    axios(options)
      .then((response) => {
        const { data, headers } = response;
          resolve({ data, cookies: headers['set-cookie'] });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = request;
