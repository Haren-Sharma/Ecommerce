import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  //! operator to assure TypeScript that process.env.DATABASE_URL is definitely defined at runtime, 
  //even though the TypeScript type checker might otherwise flag it as possibly null or undefined.
});
export const db = drizzle(pool);
