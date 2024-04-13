import zod from 'zod';

const envSchema = zod.object({
  DATABASE_URL: zod.string().nonempty(),
  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
  NEXTAUTH_URL: zod.string().nonempty(),
  NEXTAUTH_SECRET: zod.string().nonempty(),
  ADMIN: zod.string().nonempty(),
  SUPER_ADMIN: zod.string().nonempty(),
  RESEND_API_KEY: zod.string().nonempty(),
  BLOB_READ_WRITE_TOKEN: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
