import { ScheduleRepository } from './interface/scheduleRepository';
import { UserRepository } from './interface/UserRepository';
import { UpdateParticipationStatusRequest } from './dto/updateParticipationStatusRequest';
import { DomainError } from '../error/domainError';

export const respondToSchedule = (scheduleRepository: ScheduleRepository, userRepository: UserRepository, requestDto: UpdateParticipationStatusRequest) => {
    userRepository.list().then(allUsers => {
        const targetUser = allUsers.find(user => user.id() === requestDto.userId());
        if (targetUser == null) {
            // TODO: エラー処理する
            throw new DomainError("", "")
        }
        targetUser.respondToSchedule(requestDto.scheduleId(), requestDto.updatedStatus())
        scheduleRepository.updateParticipationStatus(requestDto.scheduleId(), targetUser)
    })
}