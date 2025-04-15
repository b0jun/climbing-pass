-- DropIndex
DROP INDEX "Pass_userId_gymId_status_createdAt_idx";

-- DropIndex
DROP INDEX "Pass_userId_gymId_status_name_phoneNumber_idx";

-- CreateIndex
CREATE INDEX "Pass_gymId_status_createdAt_idx" ON "Pass"("gymId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Pass_gymId_status_name_phoneNumber_idx" ON "Pass"("gymId", "status", "name", "phoneNumber");
