import pino from "https://esm.sh/pino@8.14.0";

const logger = pino({
  level: Deno.env.get("LOG_LEVEL") || "debug",
});

export default logger;
