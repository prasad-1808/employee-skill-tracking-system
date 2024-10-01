/*
  Warnings:

  - Added the required column `Proficieny` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "Proficieny" TEXT NOT NULL;
