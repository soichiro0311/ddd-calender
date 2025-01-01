import { ParticipationStatus } from '../../models/ParticipationStatus';
import { User } from '../../models/User';

export class UserDto {
    id: string
    name: string;
    participationStatus: ParticipationStatus

    constructor(model: User, scheduleId: string) {
        this.id = model.id()
        this.name = model.name()
        this.participationStatus = model.status(scheduleId)
    }

}