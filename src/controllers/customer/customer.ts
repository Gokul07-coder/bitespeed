import { Request, Response } from "express";
import { DBHelper } from "./dbHelper";
import { bodyRequest, bodyResponse } from "./interface";
const dbHelper = new DBHelper();

class Customer {
  async identifyCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { email, phoneNumber }: bodyRequest = req.body;

      //check if email or phone number is provided
      if (!email && !phoneNumber) {
        res.status(400).json({ error: "Email or phone number is required" });
      }

      //check if account exists
      let data = await dbHelper.checkExistence({ email, phoneNumber });
      if (!data?.count) {
        //create the account and return result
        let accountCreation = await dbHelper.createCustomerAccount({
          email,
          phoneNumber,
        });

        if (!accountCreation.status) {
          throw new Error("Error in creating account");
        }

        const resultResponse = dbHelper.responseFormatter(accountCreation.data);
        res.send(resultResponse);
      } else {
        const resultResponse = dbHelper.responseFormatter(data.result);
        res.send(resultResponse);
      }

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

//place order api

export default Customer;

// {
//   "contact":{
//   "primaryContatctId": 11,
//   "emails": ["george@hillvalley.edu","biffsucks@hillvalley.edu"]
//   "phoneNumbers": ["919191","717171"]
//   "secondaryContactIds": [27]
//   }
//   }
