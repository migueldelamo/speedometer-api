/*
  Warnings:

  - You are about to drop the column `xCoord` on the `Circuit` table. All the data in the column will be lost.
  - You are about to drop the column `yCoord` on the `Circuit` table. All the data in the column will be lost.
  - Added the required column `coordinates` to the `Circuit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Circuit` DROP COLUMN `xCoord`,
    DROP COLUMN `yCoord`,
    ADD COLUMN `coordinates` VARCHAR(191) NOT NULL;
