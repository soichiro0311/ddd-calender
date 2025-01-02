
import 'reflect-metadata';
import { ScheduleRepository } from '../usecases/interface/scheduleRepository';
import { Schedule } from '../models/schedule';
import { injectable } from '../node_modules/inversify/lib/cjs/annotation/injectable';
import { ParticipationStatus } from '../models/ParticipationStatus';
import { User } from '../models/User';
import { myContainer } from '../application/inversify.config';

@injectable()
export class ScheduleRepositoryMock implements ScheduleRepository {

    private dataStore: Array<Schedule> = []

    async save(schedule: Schedule) {
        this.dataStore.push(schedule);
    }

    async list(): Promise<Schedule[]> {
        return this.dataStore
    }

    updateParticipationStatus(scheduleId: string, updatedUser: User): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve(this.dataStore.forEach(schedule => {
                schedule.participants().forEach(participant => {
                    if (participant.id() === updatedUser.id()) {
                        participant.respondToSchedule(scheduleId, updatedUser.status(scheduleId)!)
                    }
                })
            }));
        })

    }

    clear(): void {
        this.dataStore = []
    }
}