const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlResponseHandler = require('./htmlResponses.js');
const jsonResponseHandler = require('./jsonResponses.js');
const xmlResponseHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  xml: {
    '/success': xmlResponseHandler.success,
    '/badRequest': xmlResponseHandler.badRequest,
    '/unauthorized': xmlResponseHandler.unauthorized,
    '/forbidden': xmlResponseHandler.forbidden,
    '/internal': xmlResponseHandler.internal,
    '/notImplemented': xmlResponseHandler.notImplemented,
    '/notFound': xmlResponseHandler.notFound,
  },
  '/': htmlResponseHandler.getIndex,
  '/success': jsonResponseHandler.success,
  '/badRequest': jsonResponseHandler.badRequest,
  '/unauthorized': jsonResponseHandler.unauthorized,
  '/forbidden': jsonResponseHandler.forbidden,
  '/internal': jsonResponseHandler.internal,
  '/notImplemented': jsonResponseHandler.notImplemented,
  '/notFound': jsonResponseHandler.notFound,
  index: htmlResponseHandler.getIndex,
  '/style.css': htmlResponseHandler.getStyle,

};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  // get our accept headers, split em up by comma
  const acceptHeaders = request.headers.accept.split(',');

  // get our parameters from the url
  const params = query.parse(parsedUrl.query);

  // based on our header type preferences, either look for XML specifically
  // or default to json/other
  if (acceptHeaders[0] === 'text/xml') {
    if (urlStruct.xml[parsedUrl.pathname]) {
      urlStruct.xml[parsedUrl.pathname](request, response, params);
    } else {
      urlStruct.xml['/notFound'](request, response, params);
    }
  } else if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct['/notFound'](request, response, params);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
