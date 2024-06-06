import { Response, Request } from "express";
import { Customerror } from "../../utils/errorFormatter";
let customerror = new Customerror();

class Health {
  health: string;
  constructor() {
    this.health = "Application seems to be healthy!";
  }

  getHealth(req: Request, res: Response) {
    try {
      res.send({ message: this.health, statusCode: 200 });
    } catch (error) {
      customerror.handleError("Internal server error", res);
    }
  }
}

export default Health;
