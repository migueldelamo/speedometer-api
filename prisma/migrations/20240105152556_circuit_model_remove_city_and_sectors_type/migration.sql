/*
  Warnings:

  - You are about to drop the column `city` on the `Circuit` table. All the data in the column will be lost.
  - Made the column `sectors` on table `Circuit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Circuit` DROP COLUMN `city`,
    MODIFY `sectors` LONGTEXT NOT NULL;
