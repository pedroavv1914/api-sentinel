
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const tenant = await prisma.tenant.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  if (tenant) {
    console.log(`TENANT_ID=${tenant.id}`);
  } else {
    console.log('No tenant found');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
