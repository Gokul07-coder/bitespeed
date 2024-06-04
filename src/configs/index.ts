import dotenv from "dotenv";
dotenv.config();
import path from "path";

if (!process.env.NODE_ENV) {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
} else if (process.env.NODE_ENV === "stage") {
  dotenv.config({ path: path.resolve(process.cwd(), "../../.env.stage") });
} else {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}

import Config from "./config";
const config = new Config(process.env);

export default config;
