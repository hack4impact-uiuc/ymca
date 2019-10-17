const sendResponse = (res, status, message, obj) => {
  res.status(status).send({
    status,
    message,
    ...obj
  });
};

module.exports = {
  sendResponse
};
