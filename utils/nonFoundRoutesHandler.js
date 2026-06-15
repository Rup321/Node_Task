import createError from "http-errors";

export const handleNotFoundRoute = (req, res, next) => {
  next(createError(404, "The requested resource could not be found"));
};
