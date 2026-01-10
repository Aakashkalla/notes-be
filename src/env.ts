import dotenv from 'dotenv'
dotenv.config();
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    MONGODB_URL: z.string().url().nonempty(), 
    PORT: z.coerce.number().default(3000), 
    JWT_SECRET:z.string()
});
export type EnvSchemaType = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env); 