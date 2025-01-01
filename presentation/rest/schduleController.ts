
import { createSchedule } from '../../usecases/createSchedule';
import { convertSchedule } from "./converter/scheduleConverter";
import { listSchdule } from '../../usecases/listSchedule';
import { myContainer } from '../../application/inversify.config';
import { ScheduleRepository } from '../../usecases/interface/scheduleRepository';
import { TYPES } from '../../application/types';
import { DomainError } from '../../error/domainError';
import { UserRepository } from '../../usecases/interface/UserRepository';
import { ScheduleDto } from './ScheduleDto';

const scheduleRepository = myContainer.get<ScheduleRepository>(TYPES.ScheduleRepository)
const userRepository = myContainer.get<UserRepository>(TYPES.UserRepository)

export const createSchdule = (request: any, response: any) => {
    try {
        const createSchduleDto = convertSchedule(request);
        createSchedule(scheduleRepository, userRepository, createSchduleDto)
        response.status(200).end()
    } catch (e) {
        if (e instanceof DomainError) {
            response.status(400).send({ errorMessage: e.message })
        }
    }
};

export const allSchedules = (_: any, response: any) => {
    listSchdule(scheduleRepository).then(allSchedules => {
        const scheduleDto = allSchedules.map(schedule => new ScheduleDto(schedule))
        response.status(200).send(scheduleDto)
    })
};
