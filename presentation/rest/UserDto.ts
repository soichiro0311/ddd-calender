import { ParticipationStatus } from '../../models/ParticipationStatus';
import { User } from '../../models/User';
import { DomainError } from '../../error/domainError';

export class UserDto {
    id: string
    name: string;
    participationStatus: ParticipationStatus

    constructor(model: User, scheduleId: string) {
        this.id = model.id()
        this.name = model.name()
        const participationStatus = model.status(scheduleId)
        if (participationStatus == null) {
            // TODO: エラー処理
            throw new DomainError("", "")
        }
        this.participationStatus = participationStatus
    }

}