class IApp {
  constructor() {
    if (this.constructor === IApp) {
      throw new Error("Cannot instantiate interface");
    }
  }

  setApp() {
    throw new Error("Method 'setApp()' must be implemented.");
  }

  setUpMiddleware() {
    throw new Error("Method 'setUpMiddleware()' must be implemented.");
  }
}

export default IApp;
