/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `messages` on the `User` table. All the data in the column will be lost.
  - Added the required column `filename` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
DROP COLUMN "messages",
ADD COLUMN     "filename" TEXT NOT NULL;
