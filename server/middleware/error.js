const notFound = (req, res, next) => {
  res.status(404); //Resource Not Found!
  const error = new Error("Resource Not Found!");
  next(error);
};
const errorHandle = (error, req, res, next) => {
  let message = error.message;
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (error.name === "CastError" && error.kind === "ObjectId") {
    message = "Resource Not Found! MongoDb Error!";
    statusCode = 404; //Not Found!
  }
  res.status(statusCode).send({ message });
  console.error(error);
};
export { notFound, errorHandle };
