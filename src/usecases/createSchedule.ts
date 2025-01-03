import { ScheduleRepository } from "./interface/scheduleRepository";
import { Schedule } from "../models/schedule";
import { CreateScheduleRequest } from "./dto/createScheduleRequest";
import { UserRepository } from "./interface/UserRepository";
import { DomainError } from "../error/domainError";
import { Participant } from "../models/Participant";

export const createSchedule = (
  scheduleRepository: ScheduleRepository,
  userRepository: UserRepository,
  createSchduleDto: CreateScheduleRequest
) => {
  if (
    createSchduleDto.participants() == null ||
    createSchduleDto.participants().length == 0
  ) {
    const schedule = Schedule.new(
      createSchduleDto.title(),
      createSchduleDto.startDatetime(),
      createSchduleDto.endDatetime(),
      []
    );
    scheduleRepository.save(schedule).catch((e) => {
      // TODO: エラーハンドリング
      throw e;
    });
  } else {
    userRepository.list().then((users) => {
      const participants = createSchduleDto
        .participants()
        .map((userId) => {
          const registeredUser = users.find(
            (user) => user.id() === userId
          );
          if (registeredUser == null) {
            // TODO: エラー処理を行う
            throw new DomainError("", "");
          }
          return registeredUser;
        });

      const schedule = Schedule.new(
        createSchduleDto.title(),
        createSchduleDto.startDatetime(),
        createSchduleDto.endDatetime(),
        participants
      );

      scheduleRepository.save(schedule).catch((e) => {
        // TODO: エラーハンドリング
        throw e;
      });
    });
  }
};
