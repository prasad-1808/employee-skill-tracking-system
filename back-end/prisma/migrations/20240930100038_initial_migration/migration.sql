-- CreateTable
CREATE TABLE "Employee" (
    "EmployeeID" SERIAL NOT NULL,
    "Firstname" TEXT NOT NULL,
    "Lastname" TEXT NOT NULL,
    "Designation" TEXT NOT NULL,
    "YearOfJoining" INTEGER NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("EmployeeID")
);

-- CreateTable
CREATE TABLE "Course" (
    "CourseID" SERIAL NOT NULL,
    "CourseName" TEXT NOT NULL,
    "Level" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("CourseID")
);

-- CreateTable
CREATE TABLE "Admin" (
    "AdminID" SERIAL NOT NULL,
    "AdminEmail" TEXT NOT NULL,
    "AdminName" TEXT NOT NULL,
    "AdminPassword" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("AdminID")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "EmployeeID" INTEGER NOT NULL,
    "CourseID" INTEGER NOT NULL,
    "Score" INTEGER NOT NULL,
    "Proof" TEXT NOT NULL,
    "Verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_AdminEmail_key" ON "Admin"("AdminEmail");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "Employee"("EmployeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_CourseID_fkey" FOREIGN KEY ("CourseID") REFERENCES "Course"("CourseID") ON DELETE RESTRICT ON UPDATE CASCADE;
