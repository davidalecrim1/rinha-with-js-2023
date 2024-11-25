import { Application } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import router from "./web/routes.ts";
import logger from "./infra/logger.ts";

const PORT = Deno.env.get("PORT") || 8080;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use((context) => {
  context.response.status = 404;
  context.response.body = "404 Not Found";
});

const closeServer = async () => {
  console.log("Received SIGINT. Shutting down...");
  Deno.exit();
};

Deno.addSignalListener("SIGINT", closeServer);

export const createServer = () => {
  app.addEventListener("listen", () => {
    logger.info(`Process ${Deno.pid} is running on http://localhost:${PORT}`);
  });

  app.listen({ port: Number(PORT) });
};

export default app;
