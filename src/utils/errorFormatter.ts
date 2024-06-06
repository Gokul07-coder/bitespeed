import { Response } from "express";
import { logger } from "./logger";

export class Customerror extends Error {
  constructor(message: string, private statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, Customerror.prototype);
  }

  handleError = (error: string | Customerror, res: Response) => {
    logger.error(error);
    console.log(error);

    if (error instanceof Customerror) {
      res.status(error.statusCode || 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
