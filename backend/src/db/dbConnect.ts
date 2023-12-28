import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as userSchema from "./schema/userSchema";

import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

const pool = new Pool({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  port: 5432,
  database: process.env.DATABASE_DB_NAME!,
});

const combinedSchema = {
  ...userSchema,
};

export const db = drizzle(pool, { schema: combinedSchema });
