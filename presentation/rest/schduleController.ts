
import { createSchedule } from '../../usecases/createSchedule';
import { convertSchedule } from "./converter/scheduleConverter";
import { listSchdule } from '../../usecases/listSchedule';
import { myContainer } from '../../application/inversify.config';
import { ScheduleRepository } from '../../usecases/interface/scheduleRepository';
import { TYPES } from '../../application/types';
import { DomainError } from '../../error/domainError';

const repository = myContainer.get<ScheduleRepository>(TYPES.ScheduleRepository)

export const createSchdule = (request: any, response: any) => {
    try {
        const schedule = convertSchedule(request);
        createSchedule(repository, schedule)
        response.status(200).end()
    } catch (e) {
        if (e instanceof DomainError) {
            response.status(400).send({ errorMessage: e.message })
        }
    }
};

export const allSchedules = (_: any, response: any) => {
    listSchdule(repository).then(allSchedules => {
        response.status(200).send(allSchedules)
    })
};
