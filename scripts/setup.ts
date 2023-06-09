import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

import { Movie } from "../src/db/models/movie";
import { Tigris } from "@tigrisdata/core";

const main = async () => {
  const client = new Tigris();
  const db = client.getDatabase();
  await db.initializeBranch();
  await db.createOrUpdateCollection<Movie>(Movie);
};

main()
  .then(() => {
    console.log("✅ Setup complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Something went wrong in the setup script");
    console.error(err);
    process.exit(1);
  });
