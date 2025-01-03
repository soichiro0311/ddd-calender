/*
  Warnings:

  - You are about to drop the `_ScheduleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ScheduleToUser" DROP CONSTRAINT "_ScheduleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleToUser" DROP CONSTRAINT "_ScheduleToUser_B_fkey";

-- DropTable
DROP TABLE "_ScheduleToUser";

-- CreateTable
CREATE TABLE "UserOnSchedule" (
    "scheduleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participationStatus" INTEGER NOT NULL,

    CONSTRAINT "UserOnSchedule_pkey" PRIMARY KEY ("scheduleId","userId")
);

-- AddForeignKey
ALTER TABLE "UserOnSchedule" ADD CONSTRAINT "UserOnSchedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnSchedule" ADD CONSTRAINT "UserOnSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
