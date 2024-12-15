
import 'reflect-metadata';
import { ScheduleRepository } from '../usecases/interface/scheduleRepository';
import { Schedule } from '../models/schedule';
import { injectable } from '../node_modules/inversify/lib/cjs/annotation/injectable';

@injectable()
export class ScheduleRepositoryMock implements ScheduleRepository {
    private dataStore: Array<Schedule> = []

    async save(schedule: Schedule) {
        this.dataStore.push(schedule);
    }

    async list(): Promise<Schedule[]> {
        return this.dataStore
    }
}