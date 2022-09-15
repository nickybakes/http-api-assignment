const respondXML = (request, response, status, xml) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  // gotta stringify to get it to just text (which we can actually send)
  response.write(xml);
  response.end();
};

const success = (request, response) => {
  const xml = '<response><message>This is a successful response</message></response>';
  respondXML(request, response, 200, xml);
};

const badRequest = (request, response, params) => {
  let xml = '<response><message>This request has the required parameters</message></response>';

  // check if this param is non existent or if it is not set to the right value ('true')
  if (!params.valid || params.valid !== 'true') {
    xml = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
    return respondXML(request, response, 400, xml);
  }

  return respondXML(request, response, 200, xml);
};

const unauthorized = (request, response, params) => {
  let xml = '<response><message>You have successfully viewed the content.</message></response>';

  // check if this param is non existent or if it is not set to the right value ('yes')
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    xml = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';
    return respondXML(request, response, 401, xml);
  }

  return respondXML(request, response, 200, xml);
};

const forbidden = (request, response) => {
  const xml = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';
  respondXML(request, response, 403, xml);
};

const internal = (request, response) => {
  const xml = '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>';
  respondXML(request, response, 500, xml);
};

const notImplemented = (request, response) => {
  const xml = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
  respondXML(request, response, 501, xml);
};

const notFound = (request, response) => {
  const xml = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
  respondXML(request, response, 404, xml);
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
