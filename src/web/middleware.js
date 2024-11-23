import { InvalidPerson } from "../app/errors.js";
import { body } from "express-validator";

export const personValidation = [
  body("apelido").exists().notEmpty().isString().isLength({ max: 32 }),

  body("nome").exists().notEmpty().isString().isLength({ max: 100 }),

  body("nascimento")
    .exists()
    .notEmpty()
    .isString()
    .matches(/^\d{4}-\d{2}-\d{2}$/), // Regex to match the format YYYY-MM-DD

  body("stack")
    .isArray()
    .optional({ nullable: true })
    .custom((value) => {
      if (
        Array.isArray(value) &&
        value.every((item) => typeof item === "string" && item.length <= 32)
      )
        return true;
      else {
        throw new InvalidPerson();
      }
    }),
];

export const timeoutMiddleware = (req, res, next) => {
  if (req.timedOut) {
    return res.status(408);
  }
  next();
};
