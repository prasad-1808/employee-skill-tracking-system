/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `CourseCode` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_EmployeeID_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "CourseCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "EmployeeID" DROP DEFAULT,
ALTER COLUMN "EmployeeID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("EmployeeID");
DROP SEQUENCE "Employee_EmployeeID_seq";

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "EmployeeID" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "Employee"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;
