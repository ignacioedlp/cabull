/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `verifications` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `verifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "verifications_expiresAt_idx";

-- AlterTable
ALTER TABLE "verifications" DROP COLUMN "expiresAt",
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "verifications_expires_at_idx" ON "verifications"("expires_at");
