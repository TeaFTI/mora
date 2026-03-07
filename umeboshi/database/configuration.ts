/**
 * Database Configuration
 */

import * as z from "zod";

const TABLE_PREFIX = process.env.UMEBOSHI_TABLE_PREFIX ?? "";

const PostgreSQLSchema = z.object({
  NODE_ENV: z.enum([
    "development",
    "test",
    "production",
  ]).default("development"),
  UMEBOSHI_DATABASE_SCHEME: z.string().default("postgresql"),
  UMEBOSHI_DATABASE_USERNAME: z.string(),
  UMEBOSHI_DATABASE_PASSWORD: z.string(),
  UMEBOSHI_DATABASE_HOST: z.string(),
  UMEBOSHI_DATABASE_PORT: z.coerce.number().default(5432),
  UMEBOSHI_DATABASE_NAME: z.string(),
  DATABASE_URI: z.string().default(""),
});

type PostgreSQLSchema = z.infer<typeof PostgreSQLSchema>;

// Database Uniform Resource Identifier (URI)
// SCHEME://USERNAME:PASSWORD@HOST:PORT/NAME
process.env.DATABASE_URI = [
  process.env.UMEBOSHI_DATABASE_SCHEME,
  "://", process.env.UMEBOSHI_DATABASE_USERNAME,
  ":", process.env.UMEBOSHI_DATABASE_PASSWORD,
  "@", process.env.UMEBOSHI_DATABASE_HOST,
  ":", process.env.UMEBOSHI_DATABASE_PORT,
  "/", process.env.UMEBOSHI_DATABASE_NAME,
].join("");

try {
  PostgreSQLSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    let message = "\nMissing Required Environment Variable:\n";
    error.issues.forEach((issue) => {
      message += `- ${issue.path}: ${issue.message}\n`;
    });
    const errorMessage = new Error(message);
    errorMessage.stack = "";
    throw errorMessage;
  } else {
    console.error(`Unexpected Error: ${error}`);
  }
}

export default PostgreSQLSchema.parse(process.env);
export {
  PostgreSQLSchema,
  TABLE_PREFIX
};
