const errorHandler = (err, req, res, next) => {
  console.log(res.statusCode);
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = status;
  return res.json({
    message: err.message,
    stack: process.env.NODE_MODE === "development" ? err.stack : null,
  });
};

export default errorHandler;
