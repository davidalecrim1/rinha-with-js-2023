import express from "express";
import router from "./web/routes.js";
import db from "./infra/database.js";
import { timeoutMiddleware } from "./web/middleware.js";
import timeout from "connect-timeout";
import logger from "./infra/logger.js";

const PORT = process.env.PORT || 8080;
const app = express();

let server;

export const createServer = () => {
  app.use(express.json());

  app.use(timeout(process.env.REQ_TIMEOUT || "20s"));
  app.use(timeoutMiddleware);

  app.use("/", router);

  app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
  });

  server = app.listen(PORT, () => {
    logger.info(
      `Worker process ${process.pid} is running on http://localhost:${PORT}`
    );
  });
};

process.on("exit", () => {
  db.end();
});

export const closeServer = async () => {
  server.close();
};

export default app;
