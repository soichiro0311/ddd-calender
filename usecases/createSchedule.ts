import { ScheduleRepository } from './interface/scheduleRepository';
import { Schedule } from '../models/schedule';
import { parse } from 'date-fns';

export const createSchedule = (repository: ScheduleRepository, schedule: Schedule) => {
    repository.save(schedule).catch((e) => {
        // TODO: エラーハンドリング
        throw e;
    })
}