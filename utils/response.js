import httpsStatus from 'http-status';

export default {
  ok: (res, options = { message: 'data found' }) => {
    const opts = { statusCode: httpsStatus.OK, ...options };
    return res.status(httpsStatus.OK).send(opts);
  },

  created: (res, options = { message: 'data inserted' }) => {
    const opts = { statusCode: httpsStatus.CREATED, ...options };
    return res.status(httpsStatus.CREATED).send(opts);
  },

  badRequest: (res, options = { error: 'bad request' }) => {
    const opts = { statusCode: httpsStatus.BAD_REQUEST, ...options };
    return res.status(httpsStatus.BAD_REQUEST).send(opts);
  },

  noData: (res, options = { error: 'no data found' }) => {
    const opts = { statusCode: httpsStatus.NOT_FOUND, ...options };
    return res.status(httpsStatus.NOT_FOUND).send(opts);
  },

  noContent: (res, options = { error: 'no content' }) => {
    const opts = { statusCode: httpsStatus.NO_CONTENT, ...options };
    return res.status(httpsStatus.NO_CONTENT).send(opts);
  },

  unauthorized: (res, options = { error: 'Unauthorized' }) => {
    const opts = { statusCode: httpsStatus.UNAUTHORIZED, ...options };
    return res.status(httpsStatus.UNAUTHORIZED).send(opts);
  },

  unprocessableEntity: (res, options = { error: 'Unprocessable Entity' }) => {
    const opts = {
      statusCode: httpsStatus.UNPROCESSABLE_ENTITY,
      ...options,
    };
    return res.status(httpsStatus.UNPROCESSABLE_ENTITY).send(opts);
  },

  forbidden: (res, options = { error: 'Forbidden Entity' }) => {
    const opts = { statusCode: httpsStatus.FORBIDDEN, ...options };
    return res.status(httpsStatus.FORBIDDEN).send(opts);
  },
};
