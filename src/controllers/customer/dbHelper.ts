import connection from "../../configs/database";
import { bodyRequest, bodyResponse, customersDetails } from "./interface";

export class DBHelper {
  async checkBothExistence(body: bodyRequest) {
    try {
      //query to check if the email and phone number exists in the database
      let result;
      result = await connection.query(
        `SELECT * FROM customer WHERE email = $1 AND phone_number = $2`,
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

  async checkExistence(body: bodyRequest) {
    try {
      let result;
      result = await connection.query(
        `
        WITH RECURSIVE cte AS (
          -- Base case
          SELECT id, phone_number, email, linkedid, linkprecedence, ARRAY[id]::int[] AS path, created_at, updated_at
          FROM customer
          WHERE (email = $1 OR phone_number = $2) AND deleted_at IS NULL
      
          UNION ALL
      
          -- Recursive case
          SELECT c.id, c.phone_number, c.email, c.linkedid, c.linkprecedence, cte.path || c.id, c.created_at, c.updated_at
          FROM customer c
          INNER JOIN cte ON (c.id = cte.linkedid OR c.email = cte.email OR c.phone_number = cte.phone_number)
          WHERE c.deleted_at IS NULL AND NOT c.id = ANY(cte.path)
      )
      SELECT id, phone_number, email, linkedid, linkprecedence, created_at, updated_at
      FROM cte;
      
    
      `,
        [body.email, body.phoneNumber]
      );

      const mapData = new Map(result.rows.map((item) => [item.id, item]));
      let uniqueData = [...mapData.values()];

      return {
        count: result.rowCount,
        result: uniqueData,
      };
    } catch (err) {
      console.log("Error in fetching data from database", err);
      throw err;
    }
  }

  async createCustomerAccount(
    data: bodyRequest,
    linkedid: number | null = null,
    linkprecedence: string = "primary"
  ) {
    try {
      let flag: boolean;
      const dataToBeInserted = [
        {
          email: data.email ? data.email : null,
          linkedid: linkedid,
          phone_number: data.phoneNumber ? data.phoneNumber : null,
          linkprecedence: linkprecedence,
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

  async modifyCustomerAccount(data: customersDetails) {
    try {
      //sort by created_at
      data.result.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      //update the primary account to secondary of 2nd object
      let query = `UPDATE customer SET linkprecedence = 'secondary', linkedid = $1 WHERE id = $2 RETURNING *`;
      let values = [data.result[0].id, data.result[1].id];
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
      console.log("Error in modifying data from database", err);
      throw err;
    }
  }

  responseFormatter(data: any) {
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
          if (contact.email && !response.emails.includes(contact.email)) {
            response.emails.push(contact.email);
          }
          if (
            contact.phone_number &&
            !response.phoneNumbers.includes(contact.phone_number)
          ) {
            response.phoneNumbers.push(contact.phone_number);
          }
        } else {
          response.secondaryContactIds.push(contact.id);
          //check if the email is already present in the array
          if (contact.email && !response.emails.includes(contact.email)) {
            response.emails.push(contact.email);
          }
          //check if the phone number is already present in the array
          if (
            contact.phone_number &&
            !response.phoneNumbers.includes(contact.phone_number)
          ) {
            response.phoneNumbers.push(contact.phone_number);
          }
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

// id,phone_number,email,linkedid,linkprecedence,
// 17,321654,lorraine@hillvalley.edu,NULL,primary,
// 18,321654,NULL,17,secondary,
// 19,NULL,lorraine@hillvalley.edu,18,secondary,
