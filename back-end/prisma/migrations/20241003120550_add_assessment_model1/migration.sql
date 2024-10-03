-- CreateTable
CREATE TABLE "AssessmentScore" (
    "id" SERIAL NOT NULL,
    "AssessmentCode" TEXT NOT NULL,
    "EmployeeID" TEXT NOT NULL,
    "CourseID" INTEGER NOT NULL,
    "ObtainedMarks" INTEGER NOT NULL,

    CONSTRAINT "AssessmentScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssessmentScore" ADD CONSTRAINT "AssessmentScore_AssessmentCode_fkey" FOREIGN KEY ("AssessmentCode") REFERENCES "Assessment"("AssessmentCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentScore" ADD CONSTRAINT "AssessmentScore_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "Employee"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentScore" ADD CONSTRAINT "AssessmentScore_CourseID_fkey" FOREIGN KEY ("CourseID") REFERENCES "Course"("CourseID") ON DELETE RESTRICT ON UPDATE CASCADE;
