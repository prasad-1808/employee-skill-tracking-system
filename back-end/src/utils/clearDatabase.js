// clearDatabase.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // List of models to clear
    const models = ['Employee', 'Course', 'Admin', 'Skill', 'Assessment','Question','AssessmentScore']; // Replace with your actual models

    for (const model of models) {
        await prisma[model].deleteMany({});
        console.log(`Cleared all records from ${model}`);
    }
}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
