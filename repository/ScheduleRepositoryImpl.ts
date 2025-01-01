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
        this.prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], })
    }

    async save(schedule: Schedule) {
        if (schedule.participants() == null || schedule.participants().length == 0) {
            await this.prisma.schedule.create({
                data: {
                    id: schedule.id(),
                    title: schedule.title(),
                    startDatetime: schedule.startDatetime(),
                    endDatetime: schedule.endDatetime(),
                    participants: {
                        create: schedule.participants().map(participant => {
                            return {
                                id: participant.id(),
                                name: participant.name()
                            }
                        })
                    },
                },
            })
        } else {
            schedule.participants().forEach(async participant => {
                console.log(participant.id())
                await this.prisma.user.update({
                    where: { id: participant.id() },
                    data: {
                        schedules: {
                            create: {
                                id: schedule.id(),
                                title: schedule.title(),
                                startDatetime: schedule.startDatetime(),
                                endDatetime: schedule.endDatetime(),
                            },
                        },
                    },
                })
            })
        }
    }

    async list(): Promise<Schedule[]> {
        return this.prisma.schedule.findMany({
            include: {
                participants: true,
            },
        }).then((scheduleData: any) => {
            const result = scheduleData.map((data: any) => convertSchedule(data))
            return result
        })
    }
}