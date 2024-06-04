//write a script to insert dump into database
import connection from "../../configs/database";

const insertDump = async () => {
  try {
    const data = [
      {
        id: "1",
        email: "mcfly@hillvalley.edu",
        linkedid: null,
        phone_number: "123456",
        linkprecedence: "primary",
      },
    ];
    const query =
      "INSERT INTO customer (id, email, linkedid, phone_number, linkprecedence) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      data[0].id,
      data[0].email,
      data[0].linkedid,
      data[0].phone_number,
      data[0].linkprecedence,
    ];

    connection.query(query, values, (err, res) => {
      if (err) throw err;
      console.log("Data inserted successfully");
    });

    console.log("Insert dump success");
  } catch (error) {
    console.error(error);
  }
};

export default insertDump;
