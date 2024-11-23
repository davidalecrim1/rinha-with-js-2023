import cluster from "cluster";
import { createServer } from "./server.js";
import logger from "./infra/logger.js";

const numCPUs = process.env.CLUSTER_WORKER || 2;

if (cluster.isPrimary) {
  logger.info(`Master process is running (PID: ${process.pid})`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.info(`Worker process ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  createServer();
}
