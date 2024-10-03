-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "AssessmentCode" TEXT NOT NULL,
    "AssessmentQuestions" JSONB NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_AssessmentCode_key" ON "Assessment"("AssessmentCode");
