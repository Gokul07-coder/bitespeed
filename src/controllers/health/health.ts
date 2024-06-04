import { Response, Request } from "express";

class Health {
  health: string;
  constructor() {
    this.health = "Application seems to be healthy!";
  }

  getHealth(req: Request, res: Response) {
    res.send({ message: this.health, statusCode: 200 });
  }
}

export default Health;
