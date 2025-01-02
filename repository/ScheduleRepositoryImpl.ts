import { ScheduleRepository } from '../usecases/interface/scheduleRepository';
import { PrismaClient } from '.prisma/client';
import { Schedule } from '../models/schedule';
import { convertSchedule } from './converter/scheduleConverter';

import 'reflect-metadata';
import { injectable } from '../node_modules/inversify/lib/cjs/annotation/injectable';
import { User } from '../models/User';
import { DomainError } from '../error/domainError';

@injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], })
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
        schedule.participants().forEach(async participant => {
            const status = participant.status(schedule.id())
            if (status == null) {
                // TODO: エラー処理の追加
                throw new DomainError("", "")
            }
            await this.prisma.user.update({
                where: { id: participant.id() },
                data: {
                    schedules: {
                        create: {
                            schedule: {
                                connect: { id: schedule.id() },
                            },
                            participationStatus: status
                        },
                    },
                },
            })
        })
    }

    async list(): Promise<Schedule[]> {
        return this.prisma.schedule.findMany({
            include: {
                participants: {
                    include: {
                        user: true
                    }
                }
            },
        }).then((scheduleData: any) => {
            const result = scheduleData.map((data: any) => convertSchedule(data))
            return result
        })
    }

    async updateParticipationStatus(scheduleId: string, updatedUser: User): Promise<void> {
        const updatedStatus = updatedUser.status(scheduleId)
        if (updatedStatus == null) {
            // TODO: エラー処理の追加
            throw new DomainError("", "")
        }
        await this.prisma.userOnSchedule.update({
            where: {
                scheduleId_userId: {
                    userId: updatedUser.id(),
                    scheduleId: scheduleId
                }
            },
            data: {
                participationStatus: updatedStatus
            },
        })
    }

    clear(): void {
        throw new Error("Method not implemented.");
    }
}