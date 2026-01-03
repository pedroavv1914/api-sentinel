"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Seeding database...');
    const tenant = await prisma.tenant.create({
        data: {
            name: 'Default Tenant',
            apps: {
                create: {
                    name: 'Default App',
                    apiKeyHash: 'dummy_hash',
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
//# sourceMappingURL=seed.js.map