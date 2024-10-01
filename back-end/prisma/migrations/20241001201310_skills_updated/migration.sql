-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_EmployeeID_fkey";

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "Employee"("EmployeeID") ON DELETE CASCADE ON UPDATE CASCADE;
