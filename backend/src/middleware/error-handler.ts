import express from "express";

export async function errorHandlerMiddleware(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log(err);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
}
