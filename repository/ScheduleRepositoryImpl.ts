import { ScheduleRepository } from '../usecases/interface/scheduleRepository';
import { PrismaClient } from '.prisma/client';
import { Schedule } from '../models/schedule';
import { convertSchedule } from './converter/scheduleConverter';

import 'reflect-metadata';
import { injectable } from '../node_modules/inversify/lib/cjs/annotation/injectable';

@injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async save(schedule: Schedule) {
        await this.prisma.schedule.create({
            data: {
                id: schedule.id(),
                title: schedule.title(),
                startDatetime: schedule.startDatetime(),
                endDatetime: schedule.endDatetime(),
            },
        })
    }

    async list(): Promise<Schedule[]> {
        return this.prisma.schedule.findMany().then((scheduleData: any) => {
            const result = scheduleData.map((data: any) => convertSchedule(data))
            return result
        })
    }
}