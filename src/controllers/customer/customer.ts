import { Request, Response } from "express";

class Customer {
  constructor() {}

  identifyCustomer(req: Request, res: Response): void {
    console.log("Identify customer");
    res.send("Identify customer");
  }
}

export default Customer;
