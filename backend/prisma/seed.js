const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample todos
  const todos = await Promise.all([
    prisma.todo.create({
      data: {
        title: 'Welcome to Todo Manager',
        description: 'This is your first todo item. You can edit, complete, or delete it.',
        completed: false,
      },
    }),
    prisma.todo.create({
      data: {
        title: 'Learn React',
        description: 'Build amazing user interfaces with React',
        completed: false,
      },
    }),
    prisma.todo.create({
      data: {
        title: 'Setup Database',
        description: 'Configure MySQL database for the todo app',
        completed: true,
      },
    }),
  ]);

  console.log(`✅ Created ${todos.length} sample todos`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
