import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create a default Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Default Tenant',
      apps: {
        create: {
          name: 'Default App',
          apiKeyHash: 'dummy_hash', // In real world, hash this
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
