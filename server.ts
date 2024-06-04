import Iserver from "./src/interface/IServer";
import App from "./src/app";
import config from "./src/configs";
import connection from "./src/configs/database";

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
      if (config.NODE_ENV === "dev")
        console.log(
          `Access server in browser: http://localhost:${config.PORT}`
        );
    });
  }

  dbConnection(): void {
    connection
      .connect()
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.log("Error in connecting to database");
      });
  }
}

const server = new Server();
