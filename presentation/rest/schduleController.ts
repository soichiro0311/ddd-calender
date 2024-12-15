
import { createSchedule } from '../../usecases/createSchedule';
import { convertSchedule } from "./converter/scheduleConverter";
import { listSchdule } from '../../usecases/listSchedule';
import { myContainer } from '../../application/inversify.config';
import { ScheduleRepository } from '../../usecases/interface/scheduleRepository';
import { TYPES } from '../../application/types';

const repository = myContainer.get<ScheduleRepository>(TYPES.ScheduleRepository)

export const createSchdule = (request: any, response: any) => {
    const schedule = convertSchedule(request);
    createSchedule(repository, schedule)
    response.status(200).end()
};

export const allSchedules = (_: any, response: any) => {
    listSchdule(repository).then(allSchedules => {
        response.status(200).send(allSchedules)
    })
};
