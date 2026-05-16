import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: process.env.ADMIN_EMAIL! },
  });

  if (!existingAdmin) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);
    await prisma.adminUser.create({
      data: {
        email: process.env.ADMIN_EMAIL!,
        passwordHash: hash,
        name: 'GAMEX Admin',
        role: 'editor',
      },
    });
    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️  Admin user already exists, skipping');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
