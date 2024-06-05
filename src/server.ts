import Iserver from "./interface/IServer";
import App from "./app";
import config from "./configs";
import connection from "./configs/database";
import { logger } from "./utils/logger";

/*
Server class
*/
class Server extends Iserver {
  app: App;
  constructor() {
    super();
    this.app = new App();
    this.startServer();
    this.dbConnection();
  }

  startServer(): void {
    this.app.app.listen(config.PORT || 3000, () => {
      console.log(`Server is running on port ${config.PORT}`);
      logger.info(`Server is running on port ${config.PORT}`);
      if (config.NODE_ENV === "dev")
        console.log(
          `Access server in browser: http://localhost:${config.PORT}`
        );
      logger.info(`Access server in browser: http://localhost:${config.PORT}`);
    });
  }

  dbConnection(): void {
    connection
      .connect()
      .then(() => {
        console.log("Database connected");
        logger.info("Database connected");
      })
      .catch((err) => {
        logger.error("Error in connecting to database", err);
        console.log("Error in connecting to database", err);
      });
  }
}

const server = new Server();
