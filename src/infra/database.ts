import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const db = new Pool({
  hostname: Deno.env.get("DB_HOST") || "localhost",
  user: Deno.env.get("DB_USER") || "admin",
  password: Deno.env.get("DB_PASSWORD") || "password",
  database: Deno.env.get("DB_SCHEMA") || "people",
  port: parseInt(Deno.env.get("DB_PORT") || "5432"),
}, parseInt(Deno.env.get("DB_MAX_CONN") || "50"));

export default db;
