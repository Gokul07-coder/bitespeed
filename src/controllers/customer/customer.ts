import { Request, Response } from "express";

class Customer {
  constructor() {
    console.log("Customer controller");
  }

  identifyCustomer(req: Request, res: Response): void {
    console.log("Identify customer");
    res.send("Identify customer");
  }
}

export default Customer;
