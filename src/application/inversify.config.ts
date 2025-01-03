import { TYPES } from "./types";
import { ScheduleRepository } from "../usecases/interface/scheduleRepository";
import { ScheduleRepositoryImpl } from "../repository/ScheduleRepositoryImpl";
import { ScheduleRepositoryMock } from "../mocks/ScheduleRepositoryMock";
import { Container } from "../../node_modules/inversify/lib/cjs";
import { UserRepository } from "../usecases/interface/UserRepository";
import { UserRepositoryMock } from "../mocks/UserRepositoryMock";
import { UserRepositoryImpl } from "../repository/UserRepositoryImpl";

const myContainer = new Container();
myContainer
  .bind<ScheduleRepository>(TYPES.ScheduleRepository)
  .to(
    process.env.NODE_ENV === "test"
      ? ScheduleRepositoryMock
      : ScheduleRepositoryImpl
  )
  .inSingletonScope();
myContainer
  .bind<UserRepository>(TYPES.UserRepository)
  .to(
    process.env.NODE_ENV === "test"
      ? UserRepositoryMock
      : UserRepositoryImpl
  )
  .inSingletonScope();

export { myContainer };
