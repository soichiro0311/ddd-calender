import { ScheduleRepository } from '../usecases/interface/scheduleRepository';
import { PrismaClient } from '../node_modules/.prisma/client';
import { Schedule } from '../models/schedule';

export class ScheduleRepositoryImpl implements ScheduleRepository {
    private prisma = new PrismaClient()

    async save(schedule: Schedule) {
        await this.prisma.schedule.create({
            data: {
                title: schedule.title(),
                startDatetime: schedule.startDatetime(),
                endDatetime: schedule.endDatetime(),
            },
        })
    }
}