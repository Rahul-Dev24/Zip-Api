
// import { PrismaClient } from '@prisma/client'

// declare global {
//     var prisma: PrismaClient | undefined
// }

// const db = globalThis.prisma || new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'],
// })

// if (process.env.NODE_ENV === 'development') {
//     globalThis.prisma = db
// }

// export default db

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client'; // Import from your custom output

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const db = new PrismaClient({ adapter }); // This satisfies the 'adapter' requirement

