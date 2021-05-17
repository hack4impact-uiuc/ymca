const fetch = require('isomorphic-unfetch');

const AUTH_SERVER_URI = 'https://nawc-staging.vercel.app/auth';

const authAdmin = async (req, res, next) => {
  auth(req, res, next, ['admin']);
};

const authVolunteer = async (req, res, next) => {
  auth(req, res, next, ['nawc volunteer']);
};

const authGeneral = async (req, res, next) => {
  auth(req, res, next, []);
};

const auth = async (req, res, next, roles) => {
  const { token } = req.headers;
  const authReq = await fetch(`${AUTH_SERVER_URI}/verify`, {
    method: 'POST',
    headers: {
      token,
    },
  });

  const authRes = await authReq.json();
  if (authRes.status === 200) {
    const { role, newToken } = authReq;
    if (Array.isArray(roles) && roles.length && roles.includes(role)) {
      res.status(403).json({
        code: 403,
        message: 'Unauthorized',
        success: false,
      });
      return;
    }
    if (newToken !== undefined) {
      res.set({ token: newToken });
    } else {
      res.set({ token });
    }
    next();
  } else {
    // if not auth'd (from https://github.com/hack4impact-uiuc/h4i-recruitment/blob/eab33c223314abb367558dc6e5cfa05d90989681/frontend/src/utils/api.js)
    res.status(403).json({
      code: 403,
      message: 'Unauthorized',
      success: false,
    });
  }
};

module.exports = { authAdmin, authVolunteer, authGeneral };
