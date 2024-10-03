/*
  Warnings:

  - You are about to drop the column `Proof` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `Score` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `SkillType` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('CERTIFICATE', 'ASSESSMENT');

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "Proof",
DROP COLUMN "Score",
ADD COLUMN     "CertificateLink" TEXT,
ADD COLUMN     "ScoreObtained" INTEGER,
ADD COLUMN     "SkillType" "SkillType" NOT NULL;
