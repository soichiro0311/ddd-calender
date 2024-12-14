import { ScheduleRepository } from './interface/scheduleRepository';
import { Schedule } from '../models/schedule';
import { parse } from 'date-fns';

export const listSchdule = (repository: ScheduleRepository) => {
    const allSchedules = repository.list().catch((e) => {
        // TODO: エラーハンドリング
        throw e;
    }).then((result) => {
        return result
    })
    return allSchedules
}