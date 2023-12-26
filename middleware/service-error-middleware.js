module.exports = (err, req, res, next) => {
  const statusCode = 200 === res.statusCode ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: 0,
    message: err?.message,
    stack: err?.stack
  });
}