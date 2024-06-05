import morgan from "morgan";
import rTracer from "cls-rtracer";
import { Request, Response } from "express";

const logger = require("pino")({
  mixin() {
    const requestId = rTracer.id();
    return {
      requestId,
    };
  },
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "yyyy-mm-dd HH:MM:ss",
      ignore: "pid,hostname,requestId",
      messageFormat: "[{requestId}]: {msg}",
      colorize: false,
      destination: "./logs.log",
    },
  },
});

morgan.token("id", (): string => rTracer.id() as string);
morgan.token("response-size", (req: Request, res: Response) =>
  res.get("Content-Length")
);
morgan.token("processing-time", (req: Request, res: Response) => {
  return (Date.now() - (req?.startTime ?? 0)).toString();
});

declare module "express" {
  interface Request {
    startTime?: number;
  }
}
const morganLogFormat =
  `[INFO] ` +
  `:date[clf] :id ${process.pid} :remote-addr :response-size :response-time ms :processing-time ms :status :url :method :url :http-version`;
`:date[clf] :id ${process.pid} :remote-addr :response-size :response-time ms :processing-time ms :status :url :method :url :http-version`;

const requestLoggerMiddleware = morgan(morganLogFormat);

export { logger, rTracer, requestLoggerMiddleware, morgan };
