-- CreateTable
CREATE TABLE "releases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "additional_info" TEXT,
    "completed_steps" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "releases_pkey" PRIMARY KEY ("id")
);
