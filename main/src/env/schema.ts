import { z } from "zod";

export const EnvSchema = z.object({
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  PORT: z.string(),
  RESEND_API_KEY: z.string(),
  FRONTEND_URL: z.string(),
})

export const parseRawEnv = (rawEnv: unknown) => {
  const { success, data, error } = EnvSchema.safeParse(rawEnv);

  if (success) {
    return data;
  }

  throw new Error(JSON.stringify(error.errors));
}