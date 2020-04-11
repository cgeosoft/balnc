export function sendCreated(res: any, data: any) {
  return res.status(201).send(data);
};

export function sendBadRequest(res: any, message: any) {
  return res.status(400).send({
    success: false,
    message: message
  });
};

export function sendUnauthorized(res: any, message: any) {
  return res.status(401).send({
    success: false,
    message: message
  });
};

export function sendForbidden(res: any) {
  return res.status(403).send({
    success: false,
    message: 'You do not have rights to access this resource.'
  });
};

export function sendNotFound(res: any) {
  return res.status(404).send({
    success: false,
    message: 'Resource not found.'
  });
};

export function setHeadersForCORS(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Content-Type, Accept");
  next();
}
