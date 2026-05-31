import { PrismaPg } from '@prisma/adapter-pg'
import pkg from '@prisma/client'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { PrismaClient } = pkg
const { Pool } = pg
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default prisma