import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as userSchema from "./schema/user.schema";
import * as itemSchema from "./schema/item.schema";
import * as imgSchema from "./schema/img.schema";
import * as addressSchema from "./schema/address.schema";

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
  ...itemSchema,
  ...imgSchema,
  ...addressSchema,
};

export const db = drizzle(pool, { schema: combinedSchema });
