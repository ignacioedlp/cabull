-- CreateTable
CREATE TABLE "business_rules" (
    "id" TEXT NOT NULL,
    "reservation_window" INTEGER NOT NULL,
    "reservation_interval" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_rules_pkey" PRIMARY KEY ("id")
);
