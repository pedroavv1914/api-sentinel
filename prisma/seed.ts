import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Hash of 'secret-123' using SHA256 (verified in Node)
  const dummyHash = '300109590f69536a400b77ef698021586bfce6809dd8782da32ade9c45457231';

  // Create a default Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Default Tenant',
      apps: {
        create: {
          name: 'Default App',
          apiKeyHash: dummyHash,
          status: 'ACTIVE',
        },
      },
    },
    include: {
      apps: true,
    },
  });

  console.log({ tenant });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
