function handleErrors(res, next, error) {
  if (error) {
    res.status(500).send(error.message);
  } else {
    next(error);
  }
}

module.exports = handleErrors;
