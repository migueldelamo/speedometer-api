/*
  Warnings:

  - You are about to drop the `_RaceToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_RaceToUser` DROP FOREIGN KEY `_RaceToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_RaceToUser` DROP FOREIGN KEY `_RaceToUser_B_fkey`;

-- DropTable
DROP TABLE `_RaceToUser`;

-- CreateTable
CREATE TABLE `UserRace` (
    `raceId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`raceId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRace` ADD CONSTRAINT `UserRace_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRace` ADD CONSTRAINT `UserRace_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
