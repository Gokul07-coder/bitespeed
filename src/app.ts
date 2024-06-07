import rateLimit from "express-rate-limit";
import IApp from "./interface/IApp";
import express from "express";
import * as core from "express-serve-static-core";
import cors from "cors";
import router from "./routes/index";
import { logger, rTracer, requestLoggerMiddleware } from "./utils/logger";

/*
App class
*/

class App extends IApp {
  app: core.Express;
  constructor() {
    super();
    this.app = express();
    this.setApp();
    this.setUpMiddleware();
    this.setUpRoutes();
  }

  setApp(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message:
          "Too many requests from this IP, please try again after a while.",
      })
    );
  }

  setUpMiddleware(): void {
    this.app.use(rTracer.expressMiddleware());
    this.app.use(requestLoggerMiddleware);
    this.app.use((req, res, next) => {
      const str = ` IP: ${req.ip} Request: ${req.method} ${req.url} ${
        req.body ? "JSON BODY IS INCLUDED" : "NO REQUEST BODY"
      }`;
      logger.info(str);
      next();
    });
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
      );
      next();
    });
    this.app.use(cors());
  }

  setUpRoutes(): void {
    this.app.use("/api/v1", router);
    this.app.use((req, res, next) => {
      res.status(404).json({
        error: 'Endpoint not found',
        message: `The requested endpoint does not exist. add prefix /api/v1 to your endpoint 1. api/v1/health - GET  2. api/v1/customers/identify - POST`
      });
    });
  }
}

export default App;
