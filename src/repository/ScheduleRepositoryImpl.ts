import { ScheduleRepository } from "../usecases/interface/scheduleRepository";
import { PrismaClient } from ".prisma/client";
import { Schedule } from "../models/schedule";
import { convertSchedule } from "./converter/scheduleConverter";

import "reflect-metadata";
import { injectable } from "../../node_modules/inversify/lib/cjs/annotation/injectable";
import { Participant } from "../models/Participant";

@injectable()
export class ScheduleRepositoryImpl
  implements ScheduleRepository
{
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }

  async save(schedule: Schedule) {
    await this.prisma.schedule.create({
      data: {
        id: schedule.id(),
        title: schedule.title(),
        startDatetime: schedule.startDatetime(),
        endDatetime: schedule.endDatetime(),
      },
    });
    schedule.participants().forEach(async (participant) => {
      console.log(participant);
      await this.prisma.user.update({
        where: { id: participant.userId() },
        data: {
          schedules: {
            create: {
              schedule: {
                connect: { id: schedule.id() },
              },
              participationStatus: participant.status(),
            },
          },
        },
      });
    });
  }

  async list(): Promise<Schedule[]> {
    return this.prisma.schedule
      .findMany({
        include: {
          participants: {
            include: {
              user: true,
            },
          },
        },
      })
      .then((scheduleData: any) => {
        const result = scheduleData.map((data: any) =>
          convertSchedule(data)
        );
        return result;
      });
  }

  async updateParticipationStatus(
    participant: Participant
  ): Promise<void> {
    await this.prisma.userOnSchedule.update({
      where: {
        scheduleId_userId: {
          userId: participant.userId(),
          scheduleId: participant.scheduleId(),
        },
      },
      data: {
        participationStatus: participant.status(),
      },
    });
  }

  clear(): void {
    throw new Error("Method not implemented.");
  }
}
