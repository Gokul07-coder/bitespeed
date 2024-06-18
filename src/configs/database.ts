import config from ".";
import { Client } from "pg";

const connection = new Client({
  user: config.USERNAME,
  password: config.PASSWORD,
  host: config.HOST,
  port: config.DB_PORT,
  database: config.DATABASE,
  // ssl: true,
});

export default connection;
