-- CreateTable
CREATE TABLE "msg" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "msg" TEXT NOT NULL,

    CONSTRAINT "msg_pkey" PRIMARY KEY ("id")
);
