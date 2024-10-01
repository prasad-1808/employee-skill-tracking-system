/*
  Warnings:

  - You are about to drop the column `Proficieny` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `Proficiency` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "Proficieny",
ADD COLUMN     "Proficiency" TEXT NOT NULL;
