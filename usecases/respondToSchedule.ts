import { ScheduleRepository } from "./interface/scheduleRepository";
import { UserRepository } from "./interface/UserRepository";
import { UpdateParticipationStatusRequest } from "./dto/updateParticipationStatusRequest";
import { DomainError } from "../error/domainError";

export const respondToSchedule = (
  scheduleRepository: ScheduleRepository,
  userRepository: UserRepository,
  requestDto: UpdateParticipationStatusRequest
) => {
  userRepository.list().then((allUsers) => {
    const targetUser = allUsers.find(
      (user) => user.id() === requestDto.userId()
    );
    if (targetUser == null) {
      // TODO: エラー処理する
      throw new DomainError("", "");
    }
    scheduleRepository.list().then((allSchedules) => {
      const targetSchedule = allSchedules.find(
        (schedule) =>
          schedule.id() === requestDto.scheduleId()
      );
      if (targetSchedule == null) {
        // TODO: エラー処理する
        throw new DomainError("", "");
      }
      const targetParticipant = targetSchedule
        .participants()
        .find(
          (participant) =>
            participant.userId() === requestDto.userId()
        );
      if (targetParticipant == null) {
        // TODO: エラー処理する
        throw new DomainError("", "");
      }
      targetParticipant.respondToSchedule(
        requestDto.updatedStatus()
      );
      scheduleRepository.updateParticipationStatus(
        targetParticipant
      );
    });
  });
};
