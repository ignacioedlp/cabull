-- CreateTable
CREATE TABLE "rate_limit_attempts" (
    "id" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_limit_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rate_limit_attempts_ip_address_created_at_idx" ON "rate_limit_attempts"("ip_address", "created_at");

-- CreateIndex
CREATE INDEX "rate_limit_attempts_expires_at_idx" ON "rate_limit_attempts"("expires_at");
