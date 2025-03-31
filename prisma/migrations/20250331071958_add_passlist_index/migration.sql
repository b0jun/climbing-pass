-- CreateIndex
CREATE INDEX "Pass_userId_gymId_status_createdAt_idx" ON "Pass"("userId", "gymId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Pass_userId_gymId_status_name_phoneNumber_idx" ON "Pass"("userId", "gymId", "status", "name", "phoneNumber");
