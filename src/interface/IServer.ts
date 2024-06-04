class IServer {
  constructor() {
    if (this.constructor === IServer) {
      throw new Error("Cannot instantiate interface");
    }
  }

  startServer() {
    throw new Error("Method 'startServer()' must be implemented.");
  }

  dbConnection() {
    throw new Error("Method 'dbConnection()' must be implemented.");
  }
}

export default IServer;
