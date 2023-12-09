/*
  Warnings:

  - You are about to drop the column `driverId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DriverToRace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Car` DROP FOREIGN KEY `Car_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `_DriverToRace` DROP FOREIGN KEY `_DriverToRace_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DriverToRace` DROP FOREIGN KEY `_DriverToRace_B_fkey`;

-- AlterTable
ALTER TABLE `Car` DROP COLUMN `driverId`,
    ADD COLUMN `userId` INTEGER NULL;

-- DropTable
DROP TABLE `Driver`;

-- DropTable
DROP TABLE `_DriverToRace`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RaceToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RaceToUser_AB_unique`(`A`, `B`),
    INDEX `_RaceToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RaceToUser` ADD CONSTRAINT `_RaceToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Race`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RaceToUser` ADD CONSTRAINT `_RaceToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
