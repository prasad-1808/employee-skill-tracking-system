// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      userid: "user123",
      name: "John Doe",
      mobileNo: "1234567890",
      age: 30,
      monthlyRevenue: 5000,
      password: "securepassword",
    },
  });

  // Create an expense for the user
  await prisma.expense.create({
    data: {
      userId: user.userid, // Reference the user's userid
      category: "Entertainment",
      amount: 150.0,
      date: new Date(),
    },
  });

  console.log("Data seeded successfully");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
