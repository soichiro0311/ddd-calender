
import { TYPES } from "./types";
import { ScheduleRepository } from '../usecases/interface/scheduleRepository';
import { ScheduleRepositoryImpl } from '../repository/ScheduleRepositoryImpl';
import { ScheduleRepositoryMock } from "../mocks/ScheduleRepositoryMock";
import { Container } from "../node_modules/inversify/lib/cjs";

const myContainer = new Container();
myContainer.bind<ScheduleRepository>(TYPES.ScheduleRepository).to(process.env.NODE_ENV === "test" ? ScheduleRepositoryMock : ScheduleRepositoryImpl);

export { myContainer };