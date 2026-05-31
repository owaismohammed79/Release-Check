import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  datasource: {
    url: "postgresql://firstdb_owner:X0Un2yotBbJq@ep-cold-sunset-a59atwal-pooler.us-east-2.aws.neon.tech/firstdb?sslmode=require&channel_binding=require",
  },
});