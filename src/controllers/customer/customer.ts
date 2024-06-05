import e, { Request, Response } from "express";
import { DBHelper } from "./dbHelper";
import { bodyRequest, customerDetails, customersDetails } from "./interface";
const dbHelper = new DBHelper();

class Customer {
  async identifyCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { email, phoneNumber }: bodyRequest = req.body;
      let emailCheck: boolean = false;
      let accountCreation: boolean = false;
      let phoneCheck: boolean = false;

      //check if email or phone number is provided
      if (!email && !phoneNumber) {
        res.status(400).json({ error: "Email or phone number is required" });
      }

      //When is a secondary contact created? ---- condition
      if (email && phoneNumber) {
        let data = await dbHelper.checkBothExistence({ email, phoneNumber });
        if (!data.count) {
          accountCreation = true;
        }
      }

      //check if account exists
      let data: customersDetails = await dbHelper.checkExistence({
        email,
        phoneNumber,
      });

      // Can primary contacts turn into secondary? ---- condition
      if (
        data?.result.length === 2 &&
        data?.result[0].linkprecedence === "primary" &&
        data?.result[1].linkprecedence === "primary"
      ) {
        accountCreation = false;
        //create an secondary account
        let accountModification = await dbHelper.modifyCustomerAccount(data);

        if (!accountModification.status) {
          throw new Error("Error in creating account");
        } else {
          data.result[1] = accountModification.data[0];
          const resultResponse = dbHelper.responseFormatter(data.result);
          res.send(resultResponse);
        }
      } else {
        // check for the data that contains the email
        data?.result.forEach((element: customerDetails) => {
          if (!(element.email === email)) {
            emailCheck = true;
          }
        });

        data?.result.forEach((element: customerDetails) => {
          if (!(element.phone_number === phoneNumber)) {
            phoneCheck = true;
          }
        });

        if (accountCreation && emailCheck) {
          //create an secondary account
          let accountCreation = await dbHelper.createCustomerAccount(
            { email, phoneNumber },
            data.result[data.result.length - 1].id,
            "secondary"
          );

          data.result.push(accountCreation.data[0]);

          if (!accountCreation.status) {
            throw new Error("Error in creating account");
          }
        } else if (accountCreation && phoneCheck) {
          //create an secondary account
          let accountCreation = await dbHelper.createCustomerAccount(
            { email, phoneNumber },
            data.result[data.result.length - 1].id,
            "secondary"
          );

          data.result.push(accountCreation.data[0]);

          if (!accountCreation.status) {
            throw new Error("Error in creating account");
          }
        }

        if (!data?.count) {
          //create the account with primary and return result
          let accountCreation = await dbHelper.createCustomerAccount({
            email,
            phoneNumber,
          });

          if (!accountCreation.status) {
            throw new Error("Error in creating account");
          }

          const resultResponse = dbHelper.responseFormatter(
            accountCreation.data
          );
          res.send(resultResponse);
        } else {
          const resultResponse = dbHelper.responseFormatter(data.result);
          res.send(resultResponse);
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default Customer;
