import { sql } from "@vercel/postgres";
import fs from "fs";
import path from "path";

async function seedDatabase() {
  try {
    const schemaPath = path.join(process.cwd(), "lib", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    await sql.query(schema);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
