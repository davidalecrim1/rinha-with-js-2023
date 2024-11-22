import pg from "pg";
const { Pool } = pg;

const createDbPool = () => {
  return new Pool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_SCHEMA || "people",
    port: process.env.DB_PORT || 5432,
    max: process.env.DB_MAX_CONN || 50,
    connectionTimeoutMillis: process.env.DB_CONN_TIMEOUT || 60000,
  });
};

const db = createDbPool();
export default db;
