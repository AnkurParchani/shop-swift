import { NextFunction } from "express";
import AppError from "./appError";

export const handleServerError = (err: any, next: NextFunction) => {
  console.error(err);
  //   If the error is of duplicate email error
  if (err.code === "23505" && err.constraint === "users_email_unique") {
    return next(new AppError(400, "Email already exists, try different one"));
  } else
    return next(
      new AppError(500, "Something went wrong, please try again later!")
    );
};
