import connection from "../../configs/database";
import { bodyRequest, bodyResponse } from "./interface";

export class DBHelper {
  async checkExistence(body: bodyRequest) {
    try {
      let result;
      result = await connection.query(
        "SELECT * from customer where email = $1 or phone_number = $2",
        [body.email, body.phoneNumber]
      );
      return {
        count: result.rowCount,
        result: result.rows,
      };
    } catch (err) {
      console.log("Error in fetching data from database", err);
      throw err;
    }
  }

  async createCustomerAccount(data: bodyRequest) {
    try {
      let flag: boolean;
      const dataToBeInserted = [
        {
          email: data.email ? data.email : null,
          linkedid: null,
          phone_number: data.phoneNumber ? data.phoneNumber : null,
          linkprecedence: "primary",
        },
      ];
      const query =
        "INSERT INTO customer (email, linkedid, phone_number, linkprecedence) VALUES ($1, $2, $3, $4) RETURNING *";
      const values = [
        dataToBeInserted[0].email,
        dataToBeInserted[0].linkedid,
        dataToBeInserted[0].phone_number,
        dataToBeInserted[0].linkprecedence,
      ];

      const res: any = await connection
        .query(query, values)
        .then((res) => {
          if (res.rowCount) {
            return {
              status: true,
              data: res.rows,
            };
          }
        })
        .catch((err) => {
          console.log("Error in inserting data into database", err);
          return {
            status: false,
            data: [],
          };
        });

      return res;
    } catch (err) {
      console.log("Error in fetching data from database", err);
      throw err;
    }
  }

  responseFormatter(data: any) {
    console.log(data);
    
    try {
      let response: bodyResponse = {
        primaryContatctId: data[0].id,
        emails: [],
        phoneNumbers: [],
        secondaryContactIds: [],
      };

      data.map((contact: any) => {
        if (contact.linkprecedence === "primary") {
          response.primaryContatctId = contact.id;
          if (contact.email) {
            response.emails.push(contact.email);
          }
          if (contact.phone_number) {
            response.phoneNumbers.push(contact.phone_number);
          }
        } else {
          response.secondaryContactIds.push(contact.id);
        }
      });

      return {
        contact: response,
      };
    } catch (err) {
      console.log("Error in formatting response", err);
      throw err;
    }
  }
}
