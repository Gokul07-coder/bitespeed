import Iserver from "./src/interface/IServer";
import App from "./src/app";
const app = new App();

class Server extends Iserver {
  app: App;
  constructor() {
    super();
    this.app = new App();
    this.startServer();
    this.dbConnection();
  }

  startServer(): void {
    this.app.app.listen(3000, () => {
      console.log("Server is running on port 3000");
      console.log("Access server in browser: http://localhost:3000");
    });
  }

  dbConnection(): void {
    console.log("DB connected");
  }
}

const server = new Server();
