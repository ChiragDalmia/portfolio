import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type Sql = NeonQueryFunction<false, true>;

// Deferred until first query so importing this module (e.g. during
// `next build` page-data collection) doesn't require POSTGRES_URL to be set.
let client: Sql | undefined;

export const sql: Sql = ((...args: Parameters<Sql>) => {
  if (!client) {
    client = neon(process.env.POSTGRES_URL!, { fullResults: true });
  }
  return client(...args);
}) as Sql;
