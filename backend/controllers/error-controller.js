const sendErrorDev = (error, res) => {
  res.json({
    success: false,
    message: error.message,
    statusCode: error.statusCode || 500,
    statusMessage: error.status,
  });
};

const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.error("ERROR 💥", error);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

async function errorHandler(error, req, res, next) {
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    sendErrorProd(error, res);
  }
}

module.exports = { errorHandler };
