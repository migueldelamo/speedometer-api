-- AlterTable
ALTER TABLE `Circuit` MODIFY `distance` DOUBLE NULL,
    MODIFY `sectors` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `surname` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL;
