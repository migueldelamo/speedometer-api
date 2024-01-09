/*
  Warnings:

  - You are about to alter the column `sectors` on the `Circuit` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `coordinates` on the `Circuit` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/
-- AlterTable
ALTER TABLE `Circuit` MODIFY `sectors` JSON NULL,
    MODIFY `coordinates` JSON NULL;
